let str = ''

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

        if (tab.url && tab.url.includes('mynetwork/invite-connect/connections')) {
            chrome.tabs.sendMessage(tabId, {
                message: 'click all profiles'
            }
            )}
        }
    })
    
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
                str = newValue
                chrome.storage.local.clear(() => console.log('storage cleared'))
                console.log('str:', str)
                let arr = str.split(',')
                console.log(arr)
                for (let i=0; i<arr.length; i++) {
                    chrome.tabs.create({url: arr[i]})
                }
            }
        })