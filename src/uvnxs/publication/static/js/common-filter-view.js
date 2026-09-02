import { initMultiSelect } from '../theme/multi-select.js';

addEventListener('DOMContentLoaded', () => {
    // Convert an ISO date string to a German date string (e.g. "2024-06-01" -> "01. Juni 2024")
    function dateStringToGermanString(dateString) {
        if (!dateString) {
            return '';
        }
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        });
    }

    // Create multi select option for fachbereiche and sachgebiete
    function createMultiSelectOption(option) {
        const li = document.createElement('li');
        li.className = 'ms-option';
        li.setAttribute('aria-selected', 'false');
        li.setAttribute('role', 'option');
        li.setAttribute('tabindex', '-1');
        li.setAttribute('data-value', option);

        const checkSpan = document.createElement('span');
        checkSpan.className = 'ms-check';
        checkSpan.setAttribute('aria-hidden', 'true');
        li.appendChild(checkSpan);

        const labelSpan = document.createElement('span');
        labelSpan.className = 'ms-option-label';
        labelSpan.textContent = option;
        li.appendChild(labelSpan);

        return li;
    }

    // Create a list item DOM element for a document
    function createListItem(doc) {
        const item = document.createElement('div');
        item.className = 'vur-documents-list__item';

        const link = document.createElement('a');
        link.href = doc.url || '#';
        link.className = 'text-black text-decoration-none';

        const content = document.createElement('div');
        content.className = 'vur-documents-list__item-content';
        const articleId = document.createElement('p');
        articleId.className = 'vur-documents-list__article-id';
        articleId.textContent = doc.article_id || '';
        const title = document.createElement('h3');
        title.textContent = doc.title || '';
        title.className = 'vur-documents-list__title';
        content.appendChild(articleId);
        content.appendChild(title);

        const dates = document.createElement('div');
        dates.className = 'vur-documents-list__item-dates';
        if (doc.pub_date) {
            const pubDate = document.createElement('div');
            const pubDateLabel = document.createElement('span');
            pubDateLabel.textContent = 'Ausgabedatum: ';
            pubDate.appendChild(pubDateLabel);
            const pubDateValue = document.createElement('strong');
            pubDateValue.textContent = dateStringToGermanString(doc.pub_date);
            pubDate.appendChild(pubDateValue);
            dates.appendChild(pubDate);
        }
        if (doc.pub_date_updated) {
            const pubDateUpdated = document.createElement('div');
            const pubDateUpdatedLabel = document.createElement('span');
            pubDateUpdatedLabel.textContent = 'Aktualisierte Fassung: ';
            pubDateUpdated.appendChild(pubDateUpdatedLabel);
            const pubDateUpdatedValue = document.createElement('strong');
            pubDateUpdatedValue.textContent = dateStringToGermanString(doc.pub_date_updated);
            pubDateUpdated.appendChild(pubDateUpdatedValue);
            dates.appendChild(pubDateUpdated);
        }

        link.appendChild(content);
        link.appendChild(dates);
        item.appendChild(link);
        return item;
    }

    // Read the current filter selections from the DOM and update the state
    function setFilterSelections() {
        const targetList = [
            ['fachbereich-multi-select', 'fachbereiche'],
            ['sachgebiet-multi-select', 'sachgebiete'],
        ];
        if (state.hasRubriken) {
            targetList.unshift(['rubrik-multi-select', 'rubriken']);
        }
        for (const [id, target] of targetList) {
            const trigger = document.getElementById(id);
            const control = trigger && trigger.closest('.form-multi-select');
            const values = new Set();
            if (control) {
                for (const row of control.querySelectorAll('.ms-option:not(.ms-option-all)')) {
                    if (row.getAttribute('aria-selected') === 'true' && row.dataset.value) {
                        values.add(row.dataset.value);
                    }
                }
            }
            state[target] = values;
        }
    }

    // Get the value to use for sorting a document by the given key
    function sortValue(doc, key) {
        const val = doc[key];
        return val === null || val === undefined ? '' : String(val);
    }

    // Checks if two sets are equal
    function setsEqual(a, b) {
        return a.size === b.size && [...a].every((value) => b.has(value));
    }

    // Rebuilds the sachgebiet container from the pristine markup, keeping only
    // the options for the selected fachbereiche and restoring the previous
    // sachgebiete selection. The mutation this causes is ignored by the observer.
    function rebuildSachgebietContainer() {
        const previousSelection = new Set(state.sachgebiete);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = sachgebietInitialHTML;
        const freshContainer = wrapper.firstElementChild;
        const freshUl = freshContainer.querySelector('.ms-listbox');

        for (const sachgebietObj of sachgebieteList) {
            const row = freshUl.querySelector(`.ms-option[data-value="${CSS.escape(sachgebietObj.name)}"]`);
            if (!row) continue;
            const shouldShow = state.fachbereiche.size === 0 || sachgebietObj.fachbereiche.some((fb) => state.fachbereiche.has(fb));
            if (shouldShow) {
                row.setAttribute('aria-selected', previousSelection.has(sachgebietObj.name) ? 'true' : 'false');
            } else {
                row.remove();
            }
        }

        ignoreNextMutation = true;
        sachgebietContainer.replaceWith(freshContainer);
        sachgebietContainer = freshContainer;
        initMultiSelect(sachgebietContainer);
    }

    // Apply the current filters and sorting to the document list
    function applyFiltersAndSort() {
        let { hasRubriken, rubriken, fachbereiche, sachgebiete, sortBy } = state;

        // sort the documents based on the selected sortBy field
        // If sorting by publication date, sort in descending order (newest first)
        if (sortBy === 'pub_date') {
            documents.sort((a, b) => sortValue(b, sortBy).localeCompare(sortValue(a, sortBy), 'de'));
        } else if (sortBy === 'article_id') {
            documents.sort((a, b) => sortValue(a, sortBy).localeCompare(sortValue(b, sortBy), 'de', { numeric: true }));
        } else {
            documents.sort((a, b) => sortValue(a, sortBy).localeCompare(sortValue(b, sortBy), 'de'));
        }

        // rebuild the sachgebiet container only when the fachbereich selection changed
        if (!setsEqual(fachbereiche, lastFachbereiche)) {
            rebuildSachgebietContainer();
            lastFachbereiche = new Set(fachbereiche);
            setFilterSelections();
            sachgebiete = state.sachgebiete;
        }

        // filter the documents based on the selected fachbereiche and sachgebiete by hiding or showing the corresponding DOM elements
        let visibleCount = 0;
        for (const doc of documents) {
            const matchRubrik = !hasRubriken || rubriken.size === 0 || rubriken.has(doc.rubrik);
            const matchFb = fachbereiche.size === 0 || fachbereiche.has(doc.fachbereich);
            const matchSg = sachgebiete.size === 0 || sachgebiete.has(doc.sachgebiet);
            const shouldShow = matchFb && matchSg && matchRubrik;
            if (shouldShow) {
                visibleCount++;
                resultsSection.appendChild(doc.domElement);
            } else {
                try {
                    resultsSection.removeChild(doc.domElement);
                } catch (e) {
                    // Element might not be in the DOM
                }
            }
        }
        countEl.textContent = visibleCount;
    }


    // DOM elements
    const resultsSection = document.querySelector('.vur-documents-list');
    if (!resultsSection) {
        return;
    }
    const filterSection = document.querySelector('.vur-filter-section__filters');
    const rubrikenContainer = document.getElementById('rubrik-multi-select-container');
    const rubrikenUl = document.getElementById('rubrik-multi-select-listbox');
    const fachbereicheContainer = document.getElementById('fachbereich-multi-select-container');
    const fachbereicheUl = document.getElementById('fachbereich-multi-select-listbox');
    let sachgebietContainer = document.getElementById('sachgebiet-multi-select-container');
    const sachgebieteUl = document.getElementById('sachgebiet-multi-select-listbox');
    const sortSelect = document.getElementById('sort-select');
    const countEl = document.querySelector('.vur-filter-section__results-count strong');

    // state for the selected filters and sorting option
    const state = {
        hasRubriken: rubrikenContainer !== null,
        rubriken: new Set(),
        fachbereiche: new Set(),
        sachgebiete: new Set(),
        sortBy: sortSelect.value || 'article_id',
    };

    // pristine sachgebiet container markup, used to fully re-render it on fachbereich changes
    let sachgebietInitialHTML = '';
    let lastFachbereiche = new Set();
    let ignoreNextMutation = false;

    // documents parsed from the JSON datalist and their corresponding DOM elements
    const documentsDatalist = document.getElementById('vur-documents-json');
    const documents = JSON.parse(documentsDatalist.getAttribute('json') || '[]');
    for (const doc of documents) {
        const domElement = createListItem(doc);
        doc.domElement = domElement;
        resultsSection.appendChild(domElement);
    }

    // filters and filter dependencies
    if (state.hasRubriken) {
        const rubrikenDatalist = document.getElementById('vur-rubriken-json');
        const rubrikenAll = JSON.parse(rubrikenDatalist.getAttribute('json') || '[]');
        for (const rubrik of rubrikenAll) {
            const rubrikElement = createMultiSelectOption(rubrik);
            rubrikenUl.appendChild(rubrikElement);
        }
    }

    const fachbereicheDatalist = document.getElementById('vur-fachbereiche-json');
    const fachbereicheAll = JSON.parse(fachbereicheDatalist.getAttribute('json') || '[]');
    for (const fachbereich of fachbereicheAll) {
        const fachbereichElement = createMultiSelectOption(fachbereich);
        fachbereicheUl.appendChild(fachbereichElement);
    }

    const sachgebieteDatalist = document.getElementById('vur-sachgebiete-json');
    const sachgebieteList = JSON.parse(sachgebieteDatalist.getAttribute('json') || '[]');
    for (const sachgebietObj of sachgebieteList) {
        sachgebieteUl.appendChild(createMultiSelectOption(sachgebietObj.name));
    }

    if (typeof initMultiSelect === 'function') {
        if (state.hasRubriken) {
            rubrikenContainer.classList.add('form-multi-select');
            initMultiSelect(rubrikenContainer);
        }
        fachbereicheContainer.classList.add('form-multi-select');
        initMultiSelect(fachbereicheContainer);
        sachgebietContainer.classList.add('form-multi-select');
        sachgebietInitialHTML = sachgebietContainer.outerHTML;
        initMultiSelect(sachgebietContainer);
    } else {
        console.warn('initMultiSelect is not defined');
    }

    // Observe sorting changes
    sortSelect.addEventListener('change', () => {
        state.sortBy = sortSelect.value;
        applyFiltersAndSort();
    });

    // The multi-select updates `aria-selected` on its options (no CustomEvent),
    // so observe the attribute changes instead.
    const observer = new MutationObserver(() => {
        if (ignoreNextMutation) {
            ignoreNextMutation = false;
            return;
        }
        setFilterSelections();
        applyFiltersAndSort();
    });
    if (filterSection) {
        observer.observe(filterSection, {
            subtree: true,
            attributes: true,
            attributeFilter: ['aria-selected'],
        });
    }

    // Initial render
    setFilterSelections();
    lastFachbereiche = new Set(state.fachbereiche);
    applyFiltersAndSort();
});