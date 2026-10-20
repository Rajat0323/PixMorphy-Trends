"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { evaluateSeo, type SeoFinding } from "@/lib/cms-seo";
import { CmsFeaturedImage } from "@/components/cms-featured-image";

type Article={id?:string;title:string;slug:string;excerpt:string;content:string;seoTitle:string;metaDescription:string;ogTitle:string;ogDescription:string;sources:string;keyword:string;canonical:string;featuredImage:string;featuredImageAlt:string;internalLinks:string;author:string;categories:string;tags:string;quality:Record<string,string>;status:string};
const initial:Article={title:"",slug:"",excerpt:"",content:"",seoTitle:"",metaDescription:"",ogTitle:"",ogDescription:"",sources:"",keyword:"",canonical:"",featuredImage:"",featuredImageAlt:"",internalLinks:"",author:"PixMorphy Editorial Team",categories:"",tags:"",quality:{},status:"draft"};
const qualityFields=[ ["problem","What problem did you personally experience?"],["method","What tool or method did you test?"],["steps","Exact steps followed"],["inputsOutputs","Actual inputs and outputs"],["comparison","Before and after comparison, if relevant"],["results","Measured results and limitations"],["evidence","Screenshots or supporting evidence"],["worked","What worked and what did not?"],["reproduce","How can another person reproduce this?"],["verifiedAt","Experiment date or last verification"] ];

export function PostEditor({postId}:{postId?:string}) {
  const router=useRouter();
  const [a,setA]=useState<Article>(initial); const [saving,setSaving]=useState(false); const [message,setMessage]=useState(""); const [loaded,setLoaded]=useState(!postId); const [focusedIssue,setFocusedIssue]=useState(""); const [preview,setPreview]=useState(false); const [privacyReviewConfirmed,setPrivacyReviewConfirmed]=useState(false); const [featuredImageStatus,setFeaturedImageStatus]=useState<"empty"|"loading"|"loaded"|"failed">("empty"); const area=useRef<HTMLDivElement>(null); const savedRange=useRef<Range|null>(null); const timer=useRef<ReturnType<typeof setTimeout>|null>(null); const lastAttempted=useRef("");
  const handleFeaturedImageStatus=useCallback((status:"empty"|"loading"|"loaded"|"failed")=>setFeaturedImageStatus(status),[]);
  useEffect(()=>{if(!postId)return;fetch(`/api/admin/posts/${postId}`).then(async r=>{if(!r.ok)throw new Error();const x=await r.json();setA({...initial,id:x.id,title:x.title??"",slug:x.slug??"",excerpt:x.excerpt??"",content:x.content??"",seoTitle:x.seo_title??"",metaDescription:x.meta_description??"",ogTitle:x.og_title??"",ogDescription:x.og_description??"",sources:x.sources??"",keyword:x.keyword??"",canonical:x.canonical??"",featuredImage:x.featured_image??"",featuredImageAlt:x.featured_image_alt??"",internalLinks:x.internal_links??"",author:"PixMorphy Editorial Team",categories:(x.categories??[]).join(", "),tags:(x.tags??[]).join(", "),quality:x.quality??{},status:x.status??"draft"});setLoaded(true);}).catch(()=>{setMessage("Unable to load article. Check database configuration.");setLoaded(true);});},[postId]);
  const update=(key:keyof Article,value:unknown)=>{setPrivacyReviewConfirmed(false);setA(old=>({...old,[key]:value}));};
  const result=useMemo(()=>evaluateSeo({title:a.title,slug:a.slug,excerpt:a.excerpt,content:a.content,seoTitle:a.seoTitle,metaDescription:a.metaDescription,keyword:a.keyword,canonical:a.canonical,featuredImageAlt:a.featuredImageAlt,internalLinks:a.internalLinks,quality:a.quality}),[a]);
  const save=useCallback(async(publish=false)=>{setSaving(true);setMessage("");try{const payload={...a,status:publish?"published":a.status||"draft",privacyReviewConfirmed:(publish||a.status==="published")&&privacyReviewConfirmed,categories:a.categories.split(",").map(x=>x.trim()).filter(Boolean),tags:a.tags.split(",").map(x=>x.trim()).filter(Boolean)};const snapshot=JSON.stringify(payload);lastAttempted.current=snapshot;const response=await fetch(postId?`/api/admin/posts/${postId}`:"/api/admin/posts",{method:postId?"PUT":"POST",headers:{"content-type":"application/json"},body:snapshot});const x=await response.json();if(!response.ok)throw new Error(x.error??"Save failed.");if(!postId&&x.id)router.push(`/admin/posts/${x.id}/edit`);else{setA(old=>({...old,id:x.id??old.id,status:publish?"published":old.status||"draft"}));setMessage(publish?"Published to the CMS blog.":"Draft saved.");}}catch(e){setMessage(e instanceof Error?e.message:"Unable to save.");}finally{setSaving(false);}},[a,postId,privacyReviewConfirmed,router]);
  useEffect(()=>{if(!loaded||!a.title.trim()||!a.slug.trim()||saving||(a.status==="published"&&!privacyReviewConfirmed))return;const snapshot=JSON.stringify({...a,status:a.status||"draft",privacyReviewConfirmed:a.status==="published"&&privacyReviewConfirmed,categories:a.categories.split(",").map(x=>x.trim()).filter(Boolean),tags:a.tags.split(",").map(x=>x.trim()).filter(Boolean)});if(snapshot===lastAttempted.current)return;if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>{void save(false);},1800);return()=>{if(timer.current)clearTimeout(timer.current);};},[a,loaded,privacyReviewConfirmed,save,saving]);
  function focus(f:SeoFinding){setFocusedIssue(f.id);const el=document.getElementById(f.id.startsWith("quality-")?`field-${f.id}`:`field-${f.field}`)??document.getElementById("article-content");el?.scrollIntoView({behavior:"smooth",block:"center"});if(el instanceof HTMLElement)el.focus();}
  const field=(key:keyof Article,label:string,props:Record<string,string>={})=><label className="block text-sm font-semibold">{label}<input id={`field-${key}`} value={String(a[key]??"")} onChange={e=>update(key,e.target.value)} {...props} className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal outline-none focus:border-blue-600" /></label>;
  function format(command:string,value?:string){area.current?.focus();document.execCommand(command,false,value);if(area.current)update("content",area.current.innerHTML);}
  function rememberEditorSelection(){
    const editor=area.current;
    const selection=window.getSelection();
    if(editor&&selection?.rangeCount){
      const range=selection.getRangeAt(0);
      if(editor.contains(range.commonAncestorContainer))savedRange.current=range.cloneRange();
    }
  }
  function applyFontSize(value:string){
    const size=Number(value);
    const editor=area.current;
    const range=savedRange.current;
    if(!editor||!Number.isInteger(size)||size<8||size>72||!range||!editor.contains(range.commonAncestorContainer)||range.collapsed){
      setMessage("Select the title or text in Main content, then choose a font size.");
      return;
    }
    editor.focus();
    const selection=window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    document.execCommand("fontSize",false,"7");
    editor.querySelectorAll('font[size="7"]').forEach(font=>{
      const span=document.createElement("span");
      span.style.fontSize=`${size}px`;
      span.innerHTML=font.innerHTML;
      font.replaceWith(span);
    });
    rememberEditorSelection();
    update("content",editor.innerHTML);
  }
  async function pasteFromClipboard(){
    const editor=area.current;
    if(!editor)return;
    editor.focus();
    const selection=window.getSelection();
    const range=selection?.rangeCount?selection.getRangeAt(0).cloneRange():null;
    try{
      let html="";
      let plain="";
      if(navigator.clipboard?.read){
        const items=await navigator.clipboard.read();
        for(const item of items){
          if(item.types.includes("text/html")){html=await(await item.getType("text/html")).text();break;}
          if(!plain&&item.types.includes("text/plain"))plain=await(await item.getType("text/plain")).text();
        }
      }else if(navigator.clipboard?.readText)plain=await navigator.clipboard.readText();
      if(!html&&!plain)throw new Error("The clipboard does not contain text.");
      const template=document.createElement("template");
      if(html){
        template.innerHTML=html;
        const allowed=new Set(["P","BR","H1","H2","H3","STRONG","B","EM","I","U","SPAN","UL","OL","LI","BLOCKQUOTE","TABLE","THEAD","TBODY","TR","TH","TD","A","IMG","FIGURE","FIGCAPTION","HR"]);
        const safeStyle=(raw:string)=>raw.split(";").flatMap(declaration=>{
          const colon=declaration.indexOf(":");
          if(colon<0)return [];
          const property=declaration.slice(0,colon).trim().toLowerCase();
          const value=declaration.slice(colon+1).trim();
          const length=/^(?:0|\d+(?:\.\d+)?(?:px|pt|em|rem|%))$/i;
          const patterns:Record<string,RegExp>={
            "font-size":/^(?:\d+(?:\.\d+)?(?:px|pt|em|rem|%)|xx-small|x-small|small|medium|large|x-large|xx-large|smaller|larger)$/i,
            "font-weight":/^(?:normal|bold|bolder|lighter|[1-9]00)$/i,
            "font-style":/^(?:normal|italic|oblique)$/i,
            "font-family":/^[\w ,"'-]{1,100}$/,
            "text-decoration":/^(?:none|underline|line-through|overline)(?:\s+(?:underline|line-through|overline))*$/i,
            "text-align":/^(?:left|right|center|justify|start|end)$/i,
            "text-indent":/^-?(?:0|\d+(?:\.\d+)?(?:px|pt|em|rem|%))$/i,
            "letter-spacing":/^-?(?:normal|0|\d+(?:\.\d+)?(?:px|pt|em|rem))$/i,
            "word-spacing":/^-?(?:normal|0|\d+(?:\.\d+)?(?:px|pt|em|rem))$/i,
            "white-space":/^(?:normal|nowrap|pre|pre-wrap|pre-line|break-spaces)$/i,
            "vertical-align":/^(?:baseline|sub|super|top|middle|bottom|text-top|text-bottom)$/i,
            "line-height":/^(?:normal|\d+(?:\.\d+)?(?:px|pt|em|rem|%)?)$/i,
            "color":/^(?:#[\da-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([\d.% ,/]+\)|[a-z]{3,20})$/i,
            "background-color":/^(?:#[\da-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([\d.% ,/]+\)|[a-z]{3,20})$/i,
            "margin-top":length,"margin-right":length,"margin-bottom":length,"margin-left":length,
            "padding-top":length,"padding-right":length,"padding-bottom":length,"padding-left":length,
          };
          return patterns[property]?.test(value)?[`${property}: ${value}`]:[];
        }).join("; ");
        const clean=(node:ParentNode)=>Array.from(node.childNodes).forEach(child=>{
          if(child.nodeType!==Node.ELEMENT_NODE)return;
          const el=child as HTMLElement;
          clean(el);
          if(!allowed.has(el.tagName)){
            const style=el.getAttribute("style")??"";
            const emphasis: string[]=[];
            if(/font-weight\s*:\s*(?:bold|[6-9]00)/i.test(style))emphasis.push("strong");
            if(/font-style\s*:\s*italic/i.test(style))emphasis.push("em");
            if(/text-decoration(?:-line)?\s*:[^;]*underline/i.test(style))emphasis.push("u");
            let replacement: Node=el.ownerDocument.createDocumentFragment();
            for(const nested of Array.from(el.childNodes))replacement.appendChild(nested);
            for(const tag of emphasis.reverse()){const wrapper=el.ownerDocument.createElement(tag);wrapper.appendChild(replacement);replacement=wrapper;}
            el.replaceWith(replacement);
            return;
          }
          for(const attr of Array.from(el.attributes)){
            const name=attr.name.toLowerCase();
            const keep=(el.tagName==="A"&&["href","title"].includes(name))||(el.tagName==="IMG"&&["src","alt","title","width","height"].includes(name))||(["TH","TD"].includes(el.tagName)&&["colspan","rowspan"].includes(name));
            if(name==="style"){
              const styles=safeStyle(attr.value);
              if(styles)el.setAttribute("style",styles);else el.removeAttribute("style");
            }else if(!keep)el.removeAttribute(attr.name);
          }
          if(el.tagName==="A"&&el.hasAttribute("href")){try{if(!["http:","https:","mailto:"].includes(new URL(el.getAttribute("href")!,location.href).protocol))el.removeAttribute("href");}catch{el.removeAttribute("href");}}
          if(el.tagName==="IMG"&&el.hasAttribute("src")){try{if(!["http:","https:"].includes(new URL(el.getAttribute("src")!,location.href).protocol))el.remove();}catch{el.remove();}}
          if(el.tagName==="H1"){
            const heading=document.createElement("h2");
            for(const attr of Array.from(el.attributes))heading.setAttribute(attr.name,attr.value);
            heading.innerHTML=el.innerHTML;
            el.replaceWith(heading);
          }
        });
        clean(template.content);
        // Word and Google Docs often mark their header row with bold cells rather than <th>.
        template.content.querySelectorAll("table").forEach(table=>{
          const firstRow=table.querySelector("tr");
          if(!firstRow||firstRow.querySelector("th"))return;
          firstRow.querySelectorAll("td").forEach(cell=>{
            if(cell.querySelector("strong,b")||cell.textContent?.trim()){
              const header=document.createElement("th");
              header.innerHTML=cell.innerHTML;
              for(const attr of Array.from(cell.attributes))header.setAttribute(attr.name,attr.value);
              cell.replaceWith(header);
            }
          });
        });
      }else{
        plain.split(/\r?\n/).forEach((line,index)=>{if(index)template.content.append(document.createElement("br"));template.content.append(document.createTextNode(line));});
      }
      if(!editor.isConnected)return;
      const target=range&&editor.contains(range.commonAncestorContainer)?range:document.createRange();
      if(!range||!editor.contains(range.commonAncestorContainer)){target.selectNodeContents(editor);target.collapse(false);}
      target.deleteContents();
      const last=template.content.lastChild;
      target.insertNode(template.content);
      if(last){target.setStartAfter(last);target.collapse(true);selection?.removeAllRanges();selection?.addRange(target);}
      update("content",editor.innerHTML);
    }catch(error){setMessage(error instanceof Error&&error.name==="NotAllowedError"?"Clipboard access was blocked. Click Main content and paste with Ctrl+V.":error instanceof Error?error.message:"Unable to read the clipboard.");}
  }
  function insertImage(){const src=prompt("Image URL (upload first in Media)");if(!src)return;const alt=prompt("Describe this image for readers who cannot see it")??"";const caption=prompt("Optional image caption")??"";const safeCaption=caption.replace(/[<>]/g,"");format("insertHTML",`<figure><img src="${src.replace(/"/g,"&quot;")}" alt="${alt.replace(/"/g,"&quot;")}"/><figcaption>${safeCaption}</figcaption></figure>`);}
  if(!loaded)return <main className="p-10">Loading editor…</main>;
  return <main className="mx-auto max-w-[1440px] px-4 py-8"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><Link href="/admin/posts" className="text-sm text-blue-700">← Posts</Link><h1 className="mt-2 text-3xl font-bold">{postId?"Edit article":"New article"}</h1></div><div className="flex flex-wrap gap-2"><button onClick={()=>setPreview(v=>!v)} className="rounded-xl border px-4 py-3 font-semibold">{preview?"Close preview":"Preview"}</button>{postId&&<button onClick={async()=>{const r=await fetch(`/api/admin/posts/${postId}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({action:"duplicate"})});const x=await r.json();if(r.ok)router.push(`/admin/posts/${x.id}/edit`);else setMessage(x.error??"Could not duplicate article.");}} className="rounded-xl border px-4 py-3">Duplicate</button>}<button onClick={()=>void save(false)} disabled={saving} className="rounded-xl border px-4 py-3 font-semibold">{saving?"Saving…":"Save draft"}</button><button onClick={()=>void save(true)} disabled={saving||!a.title||!a.slug||!privacyReviewConfirmed||(Boolean(a.featuredImage.trim())&&featuredImageStatus!=="loaded")} className="rounded-xl bg-blue-700 px-4 py-3 font-bold text-white disabled:opacity-50">Publish manually</button>{postId&&<button onClick={async()=>{if(confirm("Move this article to trash?")){const r=await fetch(`/api/admin/posts/${postId}`,{method:"DELETE"});if(r.ok)router.push("/admin/posts");else setMessage("Could not move article to trash.");}}} className="rounded-xl border border-red-300 px-4 py-3 text-red-700">Trash</button>}</div></div>
  {preview&&<article className="mb-6 rounded-2xl border bg-white p-6 sm:p-10"><h2 className="text-3xl font-bold">{a.title||"Untitled article"}</h2>{a.excerpt&&<p className="mt-3 text-lg text-slate-600">{a.excerpt}</p>}<div className="mt-6 leading-7" dangerouslySetInnerHTML={{__html:a.content}}/></article>}
  {message&&<p role="status" className="mb-4 rounded-xl bg-blue-50 p-3 text-sm">{message}</p>}
  <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px]"><section className="space-y-4 rounded-2xl border bg-slate-50 p-4 sm:p-6">{field("title","Article title",{placeholder:"Write your title"})}{field("slug","URL slug",{placeholder:"article-url-slug"})}{field("excerpt","Excerpt",{placeholder:"A short summary written by you"})}
  <div><p className="mb-1 text-sm font-semibold">Main content</p><div className="flex flex-wrap gap-1 rounded-t-xl border bg-white p-2"><button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>void pasteFromClipboard()} className="rounded border border-blue-300 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">Paste</button><label className="ml-1 flex items-center gap-1 text-xs font-medium text-slate-700"><span>Font size</span><select aria-label="Font size for selected Main content text" defaultValue="" onMouseDown={rememberEditorSelection} onChange={e=>{applyFontSize(e.currentTarget.value);e.currentTarget.value="";}} className="rounded border bg-white px-2 py-1 text-sm"><option value="" disabled>Size</option><optgroup label="Titles and headings"><option value="36">36 px — Title</option><option value="30">30 px — Subtitle</option><option value="24">24 px — Heading</option><option value="20">20 px — Subheading</option></optgroup><optgroup label="Body text"><option value="18">18 px</option><option value="16">16 px</option><option value="14">14 px</option><option value="12">12 px</option><option value="10">10 px</option></optgroup></select></label>{[["bold","Bold"],["italic","Italic"],["insertUnorderedList","• List"],["formatBlock","H2","h2"],["formatBlock","H3","h3"],["formatBlock","Quote","blockquote"]].map(([cmd,label,val])=><button type="button" key={label} onMouseDown={e=>e.preventDefault()} onClick={()=>format(cmd,val)} className="rounded border px-3 py-1 text-sm">{label}</button>)}<button type="button" onClick={()=>{const url=prompt("Enter link URL");if(url)format("createLink",url);}} className="rounded border px-3 py-1 text-sm">Link</button><button type="button" onClick={()=>format("insertHTML","<table><thead><tr><th>Heading</th><th>Heading</th></tr></thead><tbody><tr><td>Value</td><td>Value</td></tr></tbody></table>")} className="rounded border px-3 py-1 text-sm">Table</button><button type="button" onClick={insertImage} className="rounded border px-3 py-1 text-sm">Image</button></div><div ref={area} id="article-content" contentEditable suppressContentEditableWarning onMouseUp={rememberEditorSelection} onKeyUp={rememberEditorSelection} onInput={e=>{rememberEditorSelection();update("content",e.currentTarget.innerHTML);}} className="min-h-72 rounded-b-xl border border-t-0 bg-white p-4 leading-7 outline-none focus:ring-2 focus:ring-blue-200" dangerouslySetInnerHTML={{__html:a.content}} /></div>
  <div className="grid gap-3 sm:grid-cols-2">{field("categories","Categories (comma separated)")}{field("tags","Tags (comma separated)")}<div>{field("featuredImage","Featured image URL",{placeholder:"https://…/image.jpg"})}<p className="mt-1 text-xs text-slate-600">Use a direct image-file URL. A Pinterest pin page is not an image URL. You can upload the image in <Link href="/admin/media" className="text-blue-700 underline">Media</Link>.</p><CmsFeaturedImage key={a.featuredImage} src={a.featuredImage} alt={a.featuredImageAlt} editor onStatusChange={handleFeaturedImageStatus}/></div>{field("featuredImageAlt","Featured image alt text")}{field("internalLinks","Relevant internal links (one URL per line)")}</div><div className="space-y-3 rounded-xl border bg-white p-4"><h2 className="font-bold">Search and social metadata</h2>{field("seoTitle","SEO title")}{field("metaDescription","Meta description")}{field("ogTitle","Open Graph title (optional)")}{field("ogDescription","Open Graph description (optional)")}{field("keyword","Primary topic (optional)")}{field("canonical","Canonical URL (optional)")}<label className="block text-sm font-semibold">References and sources<textarea id="field-sources" value={a.sources} onChange={e=>update("sources",e.target.value)} rows={3} placeholder="Source URLs and notes (one per line)" className="mt-1 w-full rounded-xl border p-3 font-normal"/></label></div>
  <section className="space-y-3 rounded-xl border bg-white p-4"><h2 className="font-bold">First-hand experience and evidence</h2><p className="text-sm text-slate-600">Enter only experiences and results you can support. Nothing is generated automatically.</p>{qualityFields.map(([key,label])=><label key={key} className="block text-sm font-medium">{label}<textarea id={`field-quality-${key}`} value={a.quality[key]??""} onChange={e=>update("quality",{...a.quality,[key]:e.target.value})} rows={2} className="mt-1 w-full rounded-lg border p-2" /></label>)}</section>
  <section className="space-y-3 rounded-xl border border-amber-300 bg-amber-50 p-4"><h2 className="font-bold text-amber-950">Required privacy review</h2><p className="text-sm text-amber-900">Before publishing, review the article, metadata, links, author, code and images/screenshots. Remove names of employers, clients and people; contact or financial details; confidential data; credentials; and combinations that could identify you. Automated checks catch only common email, phone and credential formats.</p><label className="flex items-start gap-3 text-sm font-medium text-amber-950"><input type="checkbox" checked={privacyReviewConfirmed} onChange={e=>setPrivacyReviewConfirmed(e.target.checked)} className="mt-1 size-4"/><span>I completed this manual privacy review and found no identifying or confidential details.</span></label></section></section>
  <aside className="space-y-4 lg:sticky lg:top-4"><section className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex items-end justify-between"><h2 className="font-bold">Live SEO meter</h2><strong className="text-3xl text-blue-700">{result.score}<span className="text-base">/100</span></strong></div><p className="mt-2 text-xs text-slate-600">{result.formula}</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-blue-600 transition-all" style={{width:`${result.score}%`}}/></div><div className="mt-4 space-y-2">{result.checks.map(f=><button key={f.id} onClick={()=>focus(f)} className={`block w-full rounded-lg border p-3 text-left ${focusedIssue===f.id?"border-blue-500 bg-blue-50":"border-slate-200"}`}><span className="flex items-center justify-between gap-2 text-sm font-semibold"><span>{f.status==="pass"?"✓":f.status==="unknown"?"?":f.status==="fail"?"!":"○"} {f.label}</span><span className="text-xs font-normal text-slate-500">{f.status}</span></span>{(f.status!=="pass"||focusedIssue===f.id)&&<span className="mt-1 block text-xs text-slate-600">{f.why}<br/><b>Location:</b> {f.location}<br/><b>Fix:</b> {f.fix}<br/><b>Check:</b> {f.type}{f.source&&<> · <a href={f.source} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} className="text-blue-700 underline">Google guidance</a></>}</span>}</button>)}</div></section><p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Score measures these visible editorial and technical checks. It is not a ranking prediction or a Google ranking-system check.</p></aside></div></main>;
}
