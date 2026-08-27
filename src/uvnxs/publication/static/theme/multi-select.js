/*
 * Vanilla-Demo-Verhalten für das Multi-Select (`.form-multi-select`).
 *
 * Spiegelt die Interaktion der Angular-Komponente <dguv-multi-select> wider:
 * ein Trigger-Button (`aria-haspopup="listbox"`) öffnet ein Popover mit einer
 * Listbox (`role="listbox"` + `aria-multiselectable`). Optionen tragen
 * `role="option"` + `aria-selected`, die Checkbox-Grafik ist dekorativ. Der
 * Fokus wandert per Roving-Tabindex in die Liste (Pfeiltasten + Space/Enter),
 * Escape/Tab/Klick-außerhalb schließen und geben den Fokus an den Trigger
 * zurück. „Alle auswählen" toggelt alles; Auswahländerungen werden über eine
 * `aria-live`-Region angesagt.
 *
 * Die Auswahl steht als Chip-Reihe im Feld: bis zu `data-max-chips` (Vorgabe 5)
 * Pillen mit je einem „x" zum Entfernen, der Rest wird in einer
 * „+N weitere"-Pille zusammengefasst. Das Feld bleibt einzeilig — passen weniger
 * Pillen in die Zeile, wandern auch sie in die Sammel-Pille (Messung nach jedem
 * Render und per ResizeObserver). Die Chip-Reihe ist ein einzelner Tab-Stop;
 * zwischen den „x"-Buttons navigieren die Pfeiltasten (Entf/Backspace entfernt).
 *
 * `initMultiSelect(root)` initialisiert eine einzelne `.form-multi-select` und
 * gibt eine Aufräum-Funktion zurück. Beim Laden werden alle vorhandenen
 * Instanzen automatisch initialisiert (für die Demo-Seiten); die Storybook-Story
 * ruft `initMultiSelect` direkt auf dem gerenderten Element auf.
 */

function esc(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function initMultiSelect(root) {
    if (!root || root.dataset.msInitialized === 'true') {
        return () => {};
    }
    root.dataset.msInitialized = 'true';

    const trigger = root.querySelector('.ms-trigger');
    const listbox = root.querySelector('.ms-listbox');
    const field = root.querySelector('.ms-field');
    const valueBox = root.querySelector('.ms-value');
    const live = root.querySelector('[aria-live]');
    const allRow = listbox.querySelector('.ms-option-all');
    const optionRows = Array.from(listbox.querySelectorAll('.ms-option:not(.ms-option-all)'));
    const rows = [allRow, ...optionRows];

    const base = trigger.id;
    const placeholder = root.dataset.placeholder || 'Bitte auswählen';
    const removeLabel = root.dataset.removeLabel || 'entfernen';
    const moreLabel = root.dataset.moreLabel || 'weitere';
    const maxChips = Math.max(1, parseInt(root.dataset.maxChips, 10) || 5);

    const selected = new Set(
        optionRows
            .filter((r) => r.getAttribute('aria-selected') === 'true')
            .map((r) => r.dataset.value)
    );

    let activeIndex = 0;
    let activeChip = 0;
    let typeaheadBuffer = '';
    let typeaheadTimer = null;
    const isDisabled = (row) => row.getAttribute('aria-disabled') === 'true';
    const labelOf = (row) => row.querySelector('.ms-option-label').textContent.trim();

    function enabledRows() {
        return optionRows.filter((r) => !isDisabled(r));
    }
    function allSelected() {
        const enabled = enabledRows();
        return enabled.length > 0 && enabled.every((r) => selected.has(r.dataset.value));
    }
    function someSelected() {
        return selected.size > 0 && !allSelected();
    }
    function selectedRows() {
        return optionRows.filter((r) => selected.has(r.dataset.value));
    }
    /** Vollständiger Wert für den zugänglichen Namen (ohne sichtbare Kürzung). */
    function accessibleValue() {
        const labels = selectedRows().map(labelOf);
        return labels.length ? labels.join(', ') : placeholder;
    }
    function moreText(count) {
        return `+${count} ${moreLabel}`;
    }

    // --- Rendering ----------------------------------------------------------

    function renderValue() {
        const parts = selectedRows()
            .slice(0, maxChips)
            .map((row) => {
                const label = labelOf(row);
                return (
                    `<span class="ms-chip ms-chip-item chip selected icon-right" data-value="${esc(row.dataset.value)}">` +
                    `<span class="chip-text ms-chip-text">${esc(label)}</span>` +
                    `<button type="button" class="ms-chip-remove" tabindex="-1"${trigger.disabled ? ' disabled' : ''} ` +
                    `aria-label="${esc(`${label} ${removeLabel}`)}">` +
                    `<i class="ph ph-x-circle chip-icon" aria-hidden="true"></i></button>` +
                    `</span>`
                );
            });
        if (selected.size === 0) {
            parts.push(`<span class="ms-placeholder">${esc(placeholder)}</span>`);
        }
        // Die Sammel-Pille steht immer im DOM, damit ihre Breite vor dem
        // Umschalten messbar ist; Text und Sichtbarkeit setzt updateChipOverflow().
        parts.push('<span class="ms-chip ms-chip-more chip" hidden aria-hidden="true"></span>');
        parts.push(
            `<span class="ms-visually-hidden" id="${base}-value">${esc(accessibleValue())}</span>`
        );
        valueBox.innerHTML = parts.join('');
        updateChipOverflow();
    }

    // --- Chip-Reihe ---------------------------------------------------------

    /**
     * Blendet so viele Pillen ein, wie in die Feldzeile passen, und fasst den
     * Rest in der „+N weitere"-Pille zusammen. Zum Messen werden kurz alle
     * Pillen eingeblendet — gemalt wird erst nach dieser Funktion, es entsteht
     * also kein Flackern.
     */
    function updateChipOverflow() {
        const more = valueBox.querySelector('.ms-chip-more');
        const chips = Array.from(valueBox.querySelectorAll('.ms-chip-item'));
        const total = selected.size;
        if (!more) return;
        if (!chips.length) {
            more.hidden = true;
            return;
        }

        chips.forEach((chip) => {
            chip.hidden = false;
            chip.style.maxWidth = '';
        });
        // Breitestmöglichen Zähler messen, damit der reservierte Platz nicht
        // von der Ziffernzahl abhängt.
        more.hidden = false;
        more.textContent = moreText(total - 1);

        const gap = parseFloat(getComputedStyle(valueBox).columnGap) || 0;
        const available = valueBox.clientWidth;
        const moreWidth = more.offsetWidth;
        const widths = chips.map((chip) => chip.offsetWidth);

        // Ohne Layout-Information (unsichtbares Feld) greift nur das Limit.
        let fit = chips.length;
        let usedBefore = 0;
        if (available > 0) {
            let used = 0;
            fit = 0;
            for (let k = 1; k <= chips.length; k++) {
                const next = used + widths[k - 1] + (k > 1 ? gap : 0);
                const reserve = k < total ? gap + moreWidth : 0;
                // Die erste Pille bleibt immer stehen, notfalls gekürzt.
                if (k > 1 && next + reserve > available) break;
                usedBefore = used;
                used = next;
                fit = k;
            }
        }

        const overflow = total - fit;
        chips.forEach((chip, i) => (chip.hidden = i >= fit));
        more.hidden = overflow <= 0;
        more.textContent = overflow > 0 ? moreText(overflow) : '';

        // Langes Label in der letzten sichtbaren Pille kürzen, statt das Feld
        // überlaufen zu lassen.
        if (available > 0) {
            const reserve = overflow > 0 ? gap + moreWidth : 0;
            const cap = available - usedBefore - (fit > 1 ? gap : 0) - reserve;
            if (cap > 0 && widths[fit - 1] > cap) {
                chips[fit - 1].style.maxWidth = `${cap}px`;
            }
        }

        syncChipTabstops();
    }

    function chipRemoveButtons() {
        return Array.from(valueBox.querySelectorAll('.ms-chip-item:not([hidden]) .ms-chip-remove'));
    }

    function syncChipTabstops(buttons) {
        const list = buttons || chipRemoveButtons();
        activeChip = Math.max(0, Math.min(activeChip, list.length - 1));
        list.forEach((b, i) => b.setAttribute('tabindex', i === activeChip ? '0' : '-1'));
    }

    function focusChip(index) {
        const buttons = chipRemoveButtons();
        if (!buttons.length) {
            trigger.focus();
            return;
        }
        activeChip = Math.max(0, Math.min(index, buttons.length - 1));
        syncChipTabstops(buttons);
        buttons[activeChip].focus();
    }

    function removeChipAt(index) {
        const chip = valueBox.querySelectorAll('.ms-chip-item')[index];
        const row = chip && optionRows.find((r) => r.dataset.value === chip.dataset.value);
        if (!row || trigger.disabled) return;
        toggleOption(row); // wählt ab, rendert neu und sagt die Änderung an
        if (chipRemoveButtons().length) focusChip(index);
        else trigger.focus();
    }

    function renderChecks() {
        optionRows.forEach((row) => {
            const on = selected.has(row.dataset.value);
            row.setAttribute('aria-selected', on ? 'true' : 'false');
            row.querySelector('.ms-check').classList.toggle('checked', on);
        });
        const all = allSelected();
        const some = someSelected();
        allRow.setAttribute('aria-selected', all ? 'true' : 'false');
        const allCheck = allRow.querySelector('.ms-check');
        allCheck.classList.toggle('checked', all);
        allCheck.classList.toggle('indeterminate', some);
    }

    function update() {
        renderChecks();
        renderValue();
    }

    function announce(message) {
        if (live) live.textContent = message;
    }

    // --- Selektion ----------------------------------------------------------

    function toggleOption(row) {
        if (isDisabled(row)) return;
        const value = row.dataset.value;
        if (selected.has(value)) selected.delete(value);
        else selected.add(value);
        update();
        announce(
            `${labelOf(row)} ${selected.has(value) ? 'ausgewählt' : 'nicht ausgewählt'}, ` +
                `${selected.size} von ${optionRows.length} gewählt`
        );
    }

    function toggleAll() {
        if (allSelected()) {
            enabledRows().forEach((r) => selected.delete(r.dataset.value));
            announce('Alle abgewählt');
        } else {
            enabledRows().forEach((r) => selected.add(r.dataset.value));
            announce(`Alle ausgewählt, ${selected.size} von ${optionRows.length}`);
        }
        update();
    }

    function toggleRow(index) {
        if (index === 0) toggleAll();
        else toggleOption(optionRows[index - 1]);
    }

    function clearAll() {
        if (selected.size === 0) return;
        selected.clear();
        update();
        announce('Auswahl gelöscht');
    }

    // --- Öffnen / Schließen / Fokus ----------------------------------------

    function isOpen() {
        return !listbox.hidden;
    }

    function open() {
        if (trigger.disabled || isOpen()) return;
        listbox.hidden = false;
        root.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        const firstSelected = optionRows.findIndex((r) => selected.has(r.dataset.value));
        setActive(firstSelected >= 0 ? firstSelected + 1 : 0);
    }

    function close(returnFocus = true) {
        if (!isOpen()) return;
        listbox.hidden = true;
        root.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        if (returnFocus) trigger.focus();
    }

    function setActive(index) {
        activeIndex = index;
        rows.forEach((row, i) => row.setAttribute('tabindex', i === index ? '0' : '-1'));
        rows[index].focus();
    }

    function nextEnabled(from, dir) {
        const last = optionRows.length; // 0 = „Alle", 1..n = Optionen
        let i = from + dir;
        while (i >= 0 && i <= last) {
            if (i === 0 || !isDisabled(optionRows[i - 1])) return i;
            i += dir;
        }
        return from >= 0 && from <= last ? from : dir > 0 ? 0 : last;
    }

    function isTypeaheadChar(event) {
        return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
    }
    function typeahead(char) {
        typeaheadBuffer += char.toLowerCase();
        if (typeaheadTimer) clearTimeout(typeaheadTimer);
        typeaheadTimer = setTimeout(() => (typeaheadBuffer = ''), 500);
        const match = optionRows.findIndex((r) =>
            labelOf(r).toLowerCase().startsWith(typeaheadBuffer)
        );
        if (match >= 0) setActive(match + 1);
    }

    // --- Events -------------------------------------------------------------

    function onTriggerClick() {
        if (trigger.disabled) return;
        isOpen() ? close() : open();
    }

    function onTriggerKeydown(event) {
        if (trigger.disabled) return;
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (!isOpen()) open();
                break;
            case 'Backspace':
            case 'Delete':
                if (selected.size) {
                    event.preventDefault();
                    clearAll();
                }
                break;
            default:
                if (isTypeaheadChar(event)) {
                    event.preventDefault();
                    if (!isOpen()) open();
                    typeahead(event.key);
                }
        }
    }

    function onListboxKeydown(event) {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setActive(nextEnabled(activeIndex, 1));
                break;
            case 'ArrowUp':
                event.preventDefault();
                setActive(nextEnabled(activeIndex, -1));
                break;
            case 'Home':
                event.preventDefault();
                setActive(nextEnabled(-1, 1));
                break;
            case 'End':
                event.preventDefault();
                setActive(nextEnabled(optionRows.length + 1, -1));
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                toggleRow(activeIndex);
                break;
            case 'Escape':
                event.preventDefault();
                close();
                break;
            case 'Tab':
                close(false);
                break;
            default:
                if (isTypeaheadChar(event)) {
                    event.preventDefault();
                    typeahead(event.key);
                }
        }
    }

    function onListboxClick(event) {
        const li = event.target.closest('.ms-option');
        if (!li || !listbox.contains(li) || isDisabled(li)) return;
        const index = rows.indexOf(li);
        if (index < 0) return;
        setActive(index);
        toggleRow(index);
    }

    // Klicks auf der Wert-Box erreichen nur die Entfernen-Buttons (Rest hat
    // pointer-events:none). mousedown verhindert das Fokus-Greifen (sonst
    // Fokusring-Noise), click entfernt die Pille.
    function onValueMousedown(event) {
        if (event.target.closest('.ms-chip-remove')) event.preventDefault();
    }
    function onValueClick(event) {
        const button = event.target.closest('.ms-chip-remove');
        if (!button) return;
        event.stopPropagation();
        const chips = Array.from(valueBox.querySelectorAll('.ms-chip-item'));
        removeChipAt(chips.indexOf(button.closest('.ms-chip-item')));
    }

    // Die Chip-Reihe ist ein einzelner Tab-Stop; innerhalb navigieren die
    // Pfeiltasten zwischen den „x"-Buttons (Roving-Tabindex).
    function onValueKeydown(event) {
        const buttons = chipRemoveButtons();
        const index = buttons.indexOf(event.target);
        if (index < 0) return;
        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                focusChip(index + 1);
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                focusChip(index - 1);
                break;
            case 'Home':
                event.preventDefault();
                focusChip(0);
                break;
            case 'End':
                event.preventDefault();
                focusChip(buttons.length - 1);
                break;
            case 'Backspace':
            case 'Delete':
                event.preventDefault();
                removeChipAt(index);
                break;
            case 'Escape':
                event.preventDefault();
                trigger.focus();
                break;
        }
    }

    function onDocumentPointerDown(event) {
        if (!document.body.contains(root)) {
            document.removeEventListener('pointerdown', onDocumentPointerDown);
            return;
        }
        if (isOpen() && !root.contains(event.target)) close(false);
    }

    trigger.addEventListener('click', onTriggerClick);
    trigger.addEventListener('keydown', onTriggerKeydown);
    listbox.addEventListener('keydown', onListboxKeydown);
    listbox.addEventListener('click', onListboxClick);
    valueBox.addEventListener('mousedown', onValueMousedown);
    valueBox.addEventListener('click', onValueClick);
    valueBox.addEventListener('keydown', onValueKeydown);
    document.addEventListener('pointerdown', onDocumentPointerDown);

    // Wird das Feld schmaler, passen weniger Pillen in die Zeile.
    let resizeObserver = null;
    if (field && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => updateChipOverflow());
        resizeObserver.observe(field);
    }

    update();

    // Bei bereits offenem Markup (z. B. „Open"-Story) den Roving-Tabindex
    // vorbereiten, ohne beim Laden den Fokus zu stehlen.
    if (isOpen()) {
        activeIndex = 0;
        rows.forEach((row, i) => row.setAttribute('tabindex', i === 0 ? '0' : '-1'));
    }

    return function destroy() {
        document.removeEventListener('pointerdown', onDocumentPointerDown);
        if (resizeObserver) resizeObserver.disconnect();
        delete root.dataset.msInitialized;
    };
}

function initAll() {
    document.querySelectorAll('.form-multi-select').forEach(initMultiSelect);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
