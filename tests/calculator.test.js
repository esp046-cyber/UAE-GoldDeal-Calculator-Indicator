// Run: node tests/calculator.test.js
const OZ=31.1034768, usd=4034.40, fx=3.6725, retail=482.25;
const spot=usd/OZ*fx, pct=(retail-spot)/spot*100;
const verdict=s=>s<=0.5?'STRONG BUY':s<=1.75?'GOOD BUY':s<=3.5?'NEGOTIATE':'OVERPRICED / SELL';
const assert=require('assert');
assert.ok(Math.abs(spot-476.35)<0.1,'spot AED/g');
assert.strictEqual(verdict(pct),'GOOD BUY');
assert.strictEqual(verdict(0.2),'STRONG BUY');
assert.strictEqual(verdict(2.5),'NEGOTIATE');
assert.strictEqual(verdict(4),'OVERPRICED / SELL');
console.log('All tests passed. Spread:',pct.toFixed(2)+'%');
