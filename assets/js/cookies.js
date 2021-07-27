const cookieTitle = "Cookies und Tracking";
const cookieDesc = "Diese Seite würde dich gerne als Nutzer erfassen, dazu werden Cookies verwendet.";
const cookieThank = "Danke für deine Unterstützung."
const cookieLink = "<a href='https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=de' target='_blank'>Google Analytics</a>";
const cookieAccept = "Akzeptieren";
const cookieDismiss = "Ablehnen";

function AskForCookies(){
    document.body.innerHTML += '<div class="cookieContainer" id="cookieContainer"><div class="cookieTitle"><a>' + cookieTitle + '</a></div><div class="cookieDesc"><p>' + cookieDesc + ' ' + cookieLink + '<br>' + cookieThank + '</p></div><div class="cookieButtons"><button class="cookieButton" onClick="CookiesAccepted();">' + cookieAccept + '</button><button class="cookieButton" onClick="CookiesDismiss();">' + cookieDismiss + '</button></div></div>';
}

function CookiesDismiss(){
    fadeOut('cookieContainer');
}

function CookiesAccepted(){
    var tag = document.createElement('script');
    tag.setAttribute('async', true);
    tag.setAttribute('src','https://www.googletagmanager.com/gtag/js?id=G-JNT5581FYF');
    document.head.appendChild(tag);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-QK926EKV20');
    gtag('config', 'UA-199243991-1', { 'anonymize_ip': true } );
    fadeOut('cookieContainer');
}

function fadeOut(id){
    var e = document.getElementById(id);
    e.style.opacity = 1;

    (function fade() {
        if ((e.style.opacity -= .02) < 0) {
        e.style.display = "none";
        } else {
        requestAnimationFrame(fade);
        }
    })();
}


window.onload = function() { AskForCookies(); };