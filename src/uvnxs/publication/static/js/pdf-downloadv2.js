document.querySelectorAll('.article-action[download]').forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault()

    if (button.getAttribute('aria-disabled') === 'true') {
      return
    }

    const icon = button.querySelector(':scope > img')
    const spinner = button.querySelector(
      ':scope > .loading-indicator',
    )
    const label = button.querySelector(':scope > span:last-child')
    const originalLabel = label.textContent

    button.setAttribute('aria-disabled', 'true')
    button.setAttribute('aria-busy', 'true')

    icon.classList.add('d-none')
    spinner.classList.remove('d-none')
    label.textContent = 'PDF wird erstellt …'

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function exportStatus(start = false) {
      const statusUrl = new URL('@article_export_status', button.href);
      statusUrl.searchParams.set('export-type', 'pdf');
      if (start) {
        statusUrl.searchParams.set('start', 'true');
      }
      const response = await fetch(
        statusUrl,
        {headers: {Accept: 'application/json'}},
      );
      if (!response.ok) {
        throw new Error(`Export status request failed with status ${response.status}`);
      }
      const result = await response.json();
      if (!['Completed', 'In Progress'].includes(result.state)) {
        throw new Error(`PDF export failed: ${result.state}`);
      }
      return result.state === 'Completed';
    }

    try {
      let completed = await exportStatus(true);
      while (!completed) {
        await sleep(500);
        completed = await exportStatus();
      }
      const response = await fetch(button.href, {
        credentials: 'same-origin',
      })

      if (!response.ok) {
        throw new Error(
          `PDF request failed with status ${response.status}`,
        )
      }

      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const downloadLink = document.createElement('a')

      downloadLink.href = objectUrl
      downloadLink.download = button.download
      document.body.appendChild(downloadLink)
      downloadLink.click()
      downloadLink.remove()

      window.setTimeout(() => {
        URL.revokeObjectURL(objectUrl)
      }, 1000)
    } catch (error) {
      console.error('PDF download failed:', error)

      label.textContent = 'Download fehlgeschlagen'

      window.setTimeout(() => {
        label.textContent = originalLabel
      }, 3000)
    } finally {
      button.removeAttribute('aria-disabled')
      button.removeAttribute('aria-busy')

      icon.classList.remove('d-none')
      spinner.classList.add('d-none')

      if (label.textContent !== 'Download fehlgeschlagen') {
        label.textContent = originalLabel
      }
    }
  })
})
