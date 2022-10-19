function printToScreen(data, targetEl) {
    let cardHTML = `
            <pre>
                <code>
                    ${JSON.stringify(data)}
                </code>
            </pre>
            `;
    targetEl.innerHTML = cardHTML;
}
