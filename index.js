import{a as $,S as q,i as l}from"./assets/vendor-hwdYKDic.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const w="48848365-f4e25352a2e58b0aa69d4606d",S="https://pixabay.com/api/";async function E(s,t=1,o=40){const i=`${S}?key=${w}&q=${encodeURIComponent(s)}&image_type=photo&per_page=${o}&page=${t}`;try{return(await $.get(i)).data}catch(e){throw console.error("Error fetching images:",e),e}}function m(s,t){const o=document.querySelector(".gallery");t&&(o.innerHTML="");const i=s.map(({previewURL:e,largeImageURL:r,tags:n,likes:p,views:L,comments:b,downloads:v})=>`<li class="gallery-item">
          <a class="gallery-link" href="${r}">
            <img class="gallery-image"
                 src="${e}"
                 data-source="${r}"
                 alt="${n}" />
          </a>
          <div class="image-info">
            <table>
              <thead>
                <tr>
                  <th>Likes</th>
                  <th>Views</th>
                  <th>Comments</th>
                  <th>Downloads</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${p}</td>
                  <td>${L}</td>
                  <td>${b}</td>
                  <td>${v}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>`).join("");o.insertAdjacentHTML("beforeend",i),new q(".gallery a",{captionsData:"alt",captionDelay:250})}const g=document.querySelector(".search-form"),I=g.querySelector("input[name='text']"),a=document.querySelector(".load-more"),d=document.querySelector(".end-notification"),f=document.getElementById("loader");let c=1,u="";const P=40;let h=0;document.addEventListener("DOMContentLoaded",()=>{a.classList.add("hidden"),d.classList.add("hidden")});async function y(s,t){try{f.classList.remove("hidden-loader");const o=await E(s,t);if(h=o.totalHits,t===1?m(o.hits,!0):m(o.hits,!1),o.hits.length===0){l.error({title:"Error",message:"No images found. Try another search!",position:"topRight"}),a.classList.add("hidden"),d.classList.add("hidden");return}t*P<h?(a.classList.remove("hidden"),d.classList.add("hidden")):(a.classList.add("hidden"),d.classList.remove("hidden"),l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),t>1&&M()}catch{l.error({title:"Error",message:"Failed to fetch images. Please try again!",position:"topRight"})}finally{f.classList.add("hidden-loader")}}function M(){const s=document.querySelectorAll(".gallery-item");if(s.length>0){const{height:t}=s[0].getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}}g.addEventListener("submit",s=>{s.preventDefault();const t=I.value.trim();if(t===""){l.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}u=t,c=1,h=0,a.classList.add("hidden"),d.classList.add("hidden"),y(u,c)});a.addEventListener("click",()=>{c+=1,y(u,c)});
//# sourceMappingURL=index.js.map
