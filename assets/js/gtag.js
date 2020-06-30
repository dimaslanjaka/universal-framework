var GA_TRACKING_ID = ["UA-104256209-1","UA-106238155-1"];
GA_TRACKING_ID.forEach(function(gtagID) {
var gtagscript="https://www.googletagmanager.com/gtag/js?id="+gtagID;
var create_gtagscript = document.createElement('script');
create_gtagscript.src = gtagscript+gtagID;
create_gtagscript.async = true;
document.getElementsByTagName('body')[0].appendChild(create_gtagscript);
});
window.onload = function(){
if(window.dataLayer){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  GA_TRACKING_ID.forEach(function(gtagID) {
    gtag('config', gtagID, {
  'page_title' : document.title,
  'page_path': location.pathname});
    gtag('event', 'page_view', { 'send_to': gtagID });
    
  });

var elementsArray=document.querySelectorAll('b,iframe,ins,button,img,input,.adsense,#adsense,.ads,#ads,.ad_slot,.adsbygoogle');
elementsArray.forEach(function(elem) {
elem.addEventListener("click", function(event) {
var clickon = "X: " + event.clientX + " - Y: " + event.clientY;
dump=document.getElementById('positionTrack');
  data=this.tagName+'('+clickon+')';
  dump.textContent = data;
gtag("event","ClickPosition",{'elements':data});
})})}}

var trackLinks = document.getElementsByTagName('a');
for(var i = 0, len = trackLinks.length; i < len; i++) {
    trackLinks[i].onclick = function () {//alert(true);
gtag("event","click",{event_category:"outbound",event_label:this.href,transport_type:"beacon"});
    };
}

if (window.performance) {
  var timeSincePageLoad = Math.round(performance.now());
 gtag('event', 'timing_complete', {
    'name': 'load',
    'value': timeSincePageLoad,
    'event_category': 'JS Dependencies'
  });
var Rendertime=(window.performance.timing.loadEventStart - window.performance.timing.domLoading);
  gtag('event', 'timing_complete', {
    'name': 'render',
    'value': Rendertime,
    'event_category': 'JS Dependencies'
  });
var downloadtime=(window.performance.timing.responseEnd - window.performance.timing.navigationStart);
  gtag('event', 'timing_complete', {
    'name': 'download_from_webserver',
    'value': downloadtime,
    'event_category': 'JS Dependencies'
  });
}
