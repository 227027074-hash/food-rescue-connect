(function(){
"use strict";const $=s=>document.querySelector(s);
function escapeHTML(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function formatDate(v){const d=new Date(v);return Number.isNaN(d.getTime())?"Invalid date":d.toLocaleString();}
function message(el,text,error=false){if(!el)return;el.textContent=text;el.classList.toggle("error",error);}
function badge(s){return '<span class="badge badge-'+escapeHTML(s.toLowerCase().replace(/\s+/g,"-"))+'">'+escapeHTML(s)+'</span>';}
function currentUser(){const s=FRC.getSession();if(!s||!s.email||!s.role)return null;return FRC.getUsers().find(u=>u.email===s.email&&u.role===s.role)||null;}
function requireRole(roles){const u=currentUser();if(!u||!roles.includes(u.role)){alert("Please login with the correct demo role first.");location.href="login.html";return null;}return u;}
function logout(){FRC.clearSession();location.href="index.html";}
function renderShell(){const u=currentUser(),page=location.pathname.split("/").pop()||"index.html";const links=[["Home","index.html"],["Available Food","food-listings.html"],["Donate","donate.html"],["Dashboard","dashboard.html"],["Requests","requests.html"]];if(u&&u.role==="Admin")links.push(["Admin","admin.html"]);
const h=$("#site-header");if(h){h.className="site-header";h.innerHTML=`<div class="container nav-inner"><a class="brand" href="index.html">Food Rescue <span>Connect</span></a><nav class="nav-links" aria-label="Main navigation">${links.map(([n,p])=>`<a class="${page===p?"active":""}" href="${p}">${n}</a>`).join("")}${u?`<a href="dashboard.html">${escapeHTML(u.name)}</a><button class="btn btn-small" id="logout-button" type="button">Logout</button>`:`<a href="login.html">Login</a><a href="register.html">Register</a>`}</nav></div>`;const b=$("#logout-button");if(b)b.addEventListener("click",logout);}
const f=$("#site-footer");if(f){f.className="site-footer";f.innerHTML='<div class="container"><strong>food 92</strong><p>Rescue food. Reduce waste. Support communities.</p><small>College demonstration prototype — HTML, CSS and JavaScript.</small></div>';}}
window.FRCUI={$ ,escapeHTML,formatDate,message,badge,currentUser,requireRole,logout,renderShell};renderShell();
})();