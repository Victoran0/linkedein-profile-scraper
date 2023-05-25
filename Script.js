// The linkedin profile Contact details button
const detailsBtn = () => {
    const infoBtn = document.getElementById('top-card-text-details-contact-info');
    return infoBtn
}

// initializing an empty array to later store all the profiles found in the connections list
let allProfiles = []


// initializing an object that matches the row-title in the google sheets
const contactInfo = {
    'Name': '', 
    'Profile Link': '', 
    'Twitter Username': '',
    'Address': '',
    'Websites': '',
    'Email': '',
    'Phone Number': ''
}

// Getting the contact details from the dom and using its value as the object key value. All profiles have a name and profile Link but may not have a twitter account, phone number etc linked. so we use if statements to handle that, avoiding errors
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

// function that sends the ContactInfo object to the sheetDB api
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

// FUnction that gets all the profiles that the user is connected to
const clickConnectionProfiles = (loadProfiles) => {
    const profilesLink = document.querySelectorAll('.ember-view.mn-connection-card__link')
    profilesLink[profilesLink.length - 1].focus()

    const btn = document.querySelector('[class="artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--full artdeco-button--secondary ember-view scaffold-finite-scroll__load-button"]')
    
    if (allProfiles.length === profilesLink.length) {
        if (btn) {
            btn.click()
        } else {
            chrome.storage.local.set({profiles: allProfiles.toString()}).then(() => {
                console.log('profiles links is sent to chrome storage', allProfiles.toString())
            })
            clearInterval(loadProfiles)
        }
    }

    for(let i = allProfiles.length; i<profilesLink.length; i++){
        allProfiles.push(profilesLink[i])
    } 
}

// message passed from the service worker which has listeners for when the tab is updated and check the url
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
    
    if (obj.message === 'click all profiles') {
        const loadProfiles = setInterval(() => clickConnectionProfiles(loadProfiles), 1000 );

        setTimeout(() => document.querySelector('[class="artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--full artdeco-button--secondary ember-view scaffold-finite-scroll__load-button"]').click(), 3000);
    }
})