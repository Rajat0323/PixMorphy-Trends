import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateSeo } from "./cms-seo";
import { checkCmsPublicationPrivacy } from "./cms-privacy";

const blank={title:"",slug:"",excerpt:"",content:"",seoTitle:"",metaDescription:"",keyword:"",canonical:"",featuredImageAlt:"",internalLinks:"",quality:{}};

describe("evaluateSeo",()=>{
  it("marks missing required editorial fields and never labels unknown external checks as passed",()=>{
    const result=evaluateSeo(blank);
    assert.equal(result.checks.find((x)=>x.id==="title")?.status,"fail");
    assert.equal(result.checks.find((x)=>x.id==="crawl")?.status,"unknown");
    assert.ok(result.formula.includes("not a ranking prediction"));
  });
  it("gives no keyword-density points and recognizes useful descriptive details",()=>{
    const result=evaluateSeo({...blank,title:"A practical guide",slug:"practical-guide",content:"<h2>What we tested</h2><p>Steps and results.</p>",seoTitle:"A practical guide",metaDescription:"A clear description.",quality:{experiment:"Tested on date X"}});
    assert.equal(result.checks.find((x)=>x.id==="headings")?.status,"pass");
    assert.equal(result.checks.find((x)=>x.id==="experience")?.status,"unknown");
    assert.equal(result.checks.some((x)=>x.label.toLowerCase().includes("density")),false);
  });
});

describe("CMS publication privacy review",()=>{
  it("flags common contact details and credential formats without exposing their values",()=>{
    assert.deepEqual(checkCmsPublicationPrivacy({body:"contact rajat@example.com or +91 9876543210"}),["email address","phone number"]);
    assert.deepEqual(checkCmsPublicationPrivacy({content:"AKIAIOSFODNN7EXAMPLE"}),["credential-like string"]);
  });
  it("does not flag ordinary technical prose",()=>{
    assert.deepEqual(checkCmsPublicationPrivacy({title:"A practical RAG guide",content:"Use embeddings and evaluate retrieval quality."}),[]);
  });
});
