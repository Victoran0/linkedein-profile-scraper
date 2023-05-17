
const detailsBtn = () => {
    const infoBtn = document.getElementById('top-card-text-details-contact-info');
    return infoBtn
}

// let nIntervId;

const getContactInfo = () => {
    const nameEle = document.getElementById('pv-contact-info');
    const profile = document.getElementsByClassName('pv-contact-info__contact-link link-without-visited-state')[0];
    const websiteEle = document.getElementsByClassName('pv-contact-info__contact-link link-without-visited-state')[1];
    const emailEle = document.getElementsByClassName('pv-contact-info__contact-link link-without-visited-state')[2];
    const phoneEle = document.querySelector('.t-14.t-black.t-normal');

    const name = nameEle.textContent.split('\n')[1].trimStart();
    const profileLink = profile.href
    // const email = emailEle.href.split(':')[1]
    // const phoneNum = phoneEle.textContent.split('\n')[1].trimStart()
    
    console.log('name:', name)
    console.log('profileLink:', profileLink)
    if (websiteEle){
        const website = websiteEle.href
        console.log('website:', website)
    }
    // if (website)console.log('website:', website)
    // if (email) console.log('email:', email)
    // if (phoneNum)console.log('phoneNum:', phoneNum)
}



chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.message === 'profile page') {
        console.log(obj.message)
        if (detailsBtn) {
            detailsBtn().click()
            // clearInterval(nIntervId)
            // nIntervId = null
            // console.log('true')
        } else {
            // console.log('false')
            // nIntervId = setInterval(detailsBtn(), 1000)
        }
    }

    if (obj.message === 'scrape data') {
        console.log(obj.message + ' oya oo')
        getContactInfo()
    }
})
console.log('loaded')

