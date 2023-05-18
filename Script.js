
const detailsBtn = () => {
    const infoBtn = document.getElementById('top-card-text-details-contact-info');
    return infoBtn
}

// let nIntervId;



const getContactInfo = () => {
    const name = document.getElementById('pv-contact-info').textContent.split('\n')[1].trimStart();
    console.log('name:', name)
    
    const profileLink = document.getElementsByClassName('pv-contact-info__contact-link link-without-visited-state')[0].href
    console.log('profileLink:', profileLink)


    const addressEle = document.querySelector('.pv-contact-info__contact-type.ci-address');
    if (addressEle){
        const address = addressEle.querySelector('.pv-contact-info__contact-link.link-without-visited-state.t-14').textContent.split('\n')[1].trimStart()
        console.log('address:', address)
    } 

    const websitesEle = document.querySelector('.pv-contact-info__contact-type.ci-websites');
    if (websitesEle){
        const websites = websitesEle.getElementsByClassName('pv-contact-info__contact-link link-without-visited-state')
        for (let i=0; i<websites.length; i++) {
            console.log('website:', websites[i].href) 
        }      
    }
    
    const emailEle = document.querySelector('.pv-contact-info__contact-type.ci-email')
    if (emailEle) {
        const email = emailEle.querySelector('.pv-contact-info__contact-link.link-without-visited-state.t-14').href.split(':')[1]
        console.log('email:', email)
    } 
    
    // Get the section instead so it does not jam
    const phoneEle = document.querySelector('.t-14.t-black.t-normal');
    if (phoneEle){
        const phoneNum = phoneEle.textContent.split('\n')[1].trimStart()
        console.log('phoneNum:', phoneNum)
    } 
    
    
}



chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.message === 'profile page') {
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
        getContactInfo()
    }
})

