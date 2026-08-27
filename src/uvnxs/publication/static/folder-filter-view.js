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
        for (const [id, target] of [
            ['fachbereich-multi-select', 'fachbereiche'],
            ['sachgebiet-multi-select', 'sachgebiete'],
        ]) {
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

    // Apply the current filters and sorting to the document list
    function applyFiltersAndSort() {
        const { fachbereiche, sachgebiete, sortBy } = state;

        // sort the documents based on the selected sortBy field
        // If sorting by publication date, sort in descending order (newest first)
        if (sortBy === 'pub_date') {
            documents.sort((a, b) => sortValue(b, sortBy).localeCompare(sortValue(a, sortBy), 'de'));
        } else {
            documents.sort((a, b) => sortValue(a, sortBy).localeCompare(sortValue(b, sortBy), 'de'));
        }

        let visibleCount = 0;
        // filter the documents based on the selected fachbereiche and sachgebiete by hiding or showing the corresponding DOM elements
        for (const doc of documents) {
            const matchFb = fachbereiche.size === 0 || fachbereiche.has(doc.fachbereich);
            const matchSg = sachgebiete.size === 0 || sachgebiete.has(doc.sachgebiet);
            const shouldShow = matchFb && matchSg;
            doc.domElement.style.display = shouldShow ? '' : 'none';
            if (shouldShow) {
                visibleCount++;
            }
            resultsSection.appendChild(doc.domElement);
        }
        countEl.textContent = visibleCount;
    }


    // DOM elements
    const filterSection = document.querySelector('.vur-filter-section__filters');
    const sortSelect = document.getElementById('sort-select');
    const countEl = document.querySelector('.vur-filter-section__results-count strong');
    const resultsSection = document.querySelector('.vur-documents-list');

    // state for the selected filters and sorting option
    const state = {
        fachbereiche: new Set(),
        sachgebiete: new Set(),
        sortBy: sortSelect.value || 'article_id',
    };

    // documents parsed from the JSON datalist and their corresponding DOM elements
    const documentsDatalist = document.getElementById('vur-documents-json');
    const documents = JSON.parse(documentsDatalist.getAttribute('json') || '[]');
    for (const doc of documents) {
        const domElement = createListItem(doc);
        doc.domElement = domElement;
        resultsSection.appendChild(domElement);
    }

    // Observe sorting changes
    sortSelect.addEventListener('change', () => {
        state.sortBy = sortSelect.value;
        applyFiltersAndSort();
    });

    // The multi-select updates `aria-selected` on its options (no CustomEvent),
    // so observe the attribute changes instead.
    const observer = new MutationObserver(() => {
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
    applyFiltersAndSort();
});