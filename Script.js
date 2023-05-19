
const detailsBtn = () => {
    const infoBtn = document.getElementById('top-card-text-details-contact-info');
    return infoBtn
}

// let nIntervId;

const contactInfo = {
    'Name': '', 
    'Profile Link': '', 
    'Twitter Username': '',
    'Address': '',
    'Websites': '',
    'Email': '',
    'Phone Number': ''
}

const getContactInfo = () => {
    const name = document.getElementById('pv-contact-info').textContent.split('\n')[1].trimStart();
    contactInfo['Name'] = name
    
    const profileLink = document.getElementsByClassName('pv-contact-info__contact-link link-without-visited-state')[0].href
    contactInfo['Profile Link'] = profileLink
    
    
    const twitterEle = document.querySelector('.pv-contact-info__contact-type.ci-twitter')
    if (twitterEle) {
        const twitterUsername = twitterEle.querySelector('.pv-contact-info__contact-link.link-without-visited-state.t-14').textContent.split('\n')[1].trimStart()
        contactInfo['Twitter Username'] = twitterUsername
    }
    
    const addressEle = document.querySelector('.pv-contact-info__contact-type.ci-address');
    if (addressEle){
        const address = addressEle.querySelector('.pv-contact-info__contact-link.link-without-visited-state.t-14').textContent.split('\n')[1].trimStart()
        contactInfo['Address'] = address
    } 
    
    const websitesEle = document.querySelector('.pv-contact-info__contact-type.ci-websites');
    if (websitesEle){
        const websites = websitesEle.getElementsByClassName('pv-contact-info__contact-link link-without-visited-state')
        let websitesArr = []
        for (let i=0; i<websites.length; i++) {
            websitesArr.push(websites[i].href)
        }      
        contactInfo['Websites'] = websitesArr.toString()
    }
    
    
    const emailEle = document.querySelector('.pv-contact-info__contact-type.ci-email')
    if (emailEle) {
        const email = emailEle.querySelector('.pv-contact-info__contact-link.link-without-visited-state.t-14').href.split(':')[1]
        contactInfo['Email'] = email
    } 
    
    const phoneEle = document.querySelector('.pv-contact-info__contact-type.ci-phone')
    if (phoneEle){
        const phoneNum = phoneEle.querySelector('.t-14.t-black.t-normal').textContent.split('\n')[1].trimStart()        
        contactInfo['Phone Number'] = phoneNum
    } 
    console.log(contactInfo) 
}


const postToSheets = () => {
    fetch('https://sheetdb.io/api/v1/b66s3kot3mss6', {
        method: 'POST',
        body: JSON.stringify(contactInfo),
        headers: {
            "Content-type": "application/json;  charset=UTF-8"
        }
    }).then((response) => response.json())
    .then(() => alert('successfully sent contact data to google sheets'))
}


chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.message === 'profile page') {
        if (detailsBtn) {
            detailsBtn().click()
        } 
    }

    if (obj.message === 'scrape data') {
        getContactInfo()
        postToSheets()
    }
})

