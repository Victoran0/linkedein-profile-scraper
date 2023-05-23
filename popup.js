const btn = document.getElementById('btn')
const pageType = document.getElementById('pageType')

btn.addEventListener('click', () => {
    chrome.tabs.create({
        active: true,
        url: 'https://docs.google.com/spreadsheets/d/1bg5K9H8St6mTECOPgfiEVuLKdc7TDRO7xSYHR6QE2cg/edit#gid=0'
    })
})

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0].url.includes('linkedin.com/in')) {
        if (pageType.className === 'red') {
            pageType.classList.remove('red')
        }
        pageType.classList.add('green')
        pageType.textContent = 'Scraping Data...'
    } else {
        if (pageType.className === 'green') {
            pageType.classList.remove('green')
        }
        pageType.classList.add('red')
        pageType.textContent = 'This is not a linkedin Profile Page, Kindly Visit One or More to scrape Data!'
    }
})



