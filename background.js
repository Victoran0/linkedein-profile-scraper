chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {    
        if (tab.url && tab.url.includes("linkedin.com/in")) {
            chrome.tabs.sendMessage(tabId, {
                message: 'profile page'
            })
            console.log('profile page')
        }

        if (tab.url && tab.url.includes('overlay/contact-info')) {
            chrome.tabs.sendMessage(tabId, {
                message: 'scrape data'
            })
        }
    }
})

// console.log('extension loaded')