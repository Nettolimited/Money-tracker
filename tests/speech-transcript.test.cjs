const {test} = require('node:test');
const assert = require('node:assert/strict');
const {createSession} = require('../speech-transcript.js');
function event(parts, resultIndex=0) {
  return {resultIndex,results:parts.map(([transcript,isFinal]) => Object.assign([{transcript}], {isFinal}))};
}
test('Repeated events replace an indexed final slot rather than append text', () => {
  const session=createSession();
  for(let i=0;i<10;i++) assert.deepEqual(session.update(event([['ข้าวหมูกรอบ 50 บาท',true]])), {finalTranscript:'ข้าวหมูกรอบ 50 บาท',interimTranscript:''});
  assert.equal(session.finish().finalTranscript,'ข้าวหมูกรอบ 50 บาท');
});
test('Interim revisions are separate and become final only when isFinal is true', () => {
  const session=createSession();
  assert.deepEqual(session.update(event([['ข้าว',false]])),{finalTranscript:'',interimTranscript:'ข้าว'});
  assert.deepEqual(session.update(event([['ข้าวหมูกรอบ 50',false]])),{finalTranscript:'',interimTranscript:'ข้าวหมูกรอบ 50'});
  assert.deepEqual(session.update(event([['ข้าวหมูกรอบ 50 บาท',true]])),{finalTranscript:'ข้าวหมูกรอบ 50 บาท',interimTranscript:''});
});
test('resultIndex updates only changed suffix while keeping prior finalized slots', () => {
  const session=createSession();
  session.update(event([['ข้าว 50 บาท',true],['แล้ว กาแฟ',false]]));
  const next=event([['ignored prefix',true],['แล้ว กาแฟ 55 บาท',true]],1);
  Object.defineProperty(next.results,0,{get(){throw new Error('unchanged result must not be read again');}});
  assert.deepEqual(session.update(next),{finalTranscript:'ข้าว 50 บาท แล้ว กาแฟ 55 บาท',interimTranscript:''});
});
test('Removed interim suffix cannot linger in final or interim state', () => {
  const session=createSession();
  session.update(event([['ข้าว 50 บาท',true],['กาแฟ',false],['ไม่ชัด',false]]));
  assert.deepEqual(session.update(event([['ข้าว 50 บาท',true]],1)),{finalTranscript:'ข้าว 50 บาท',interimTranscript:''});
});
test('Finishing drops unconfirmed interim text and ignores late results', () => {
  const session=createSession();
  session.update(event([['ข้าว 50 บาท',true],['แล้ว กาแฟ',false]]));
  assert.deepEqual(session.finish(),{finalTranscript:'ข้าว 50 บาท',interimTranscript:''});
  assert.deepEqual(session.update(event([['late callback',true]])),{finalTranscript:'ข้าว 50 บาท',interimTranscript:''});
});
test('A genuinely repeated word or utterance in separate result slots is preserved', () => {
  const session=createSession();
  assert.equal(session.update(event([['น้ำ น้ำ 20 บาท',true],['แล้ว น้ำ น้ำ 20 บาท',true]])).finalTranscript,'น้ำ น้ำ 20 บาท แล้ว น้ำ น้ำ 20 บาท');
});
test('Session restart is isolated and does not carry earlier result slots', () => {
  const old=createSession();old.update(event([['ข้าว 50 บาท',true]]));old.finish();
  const next=createSession();assert.deepEqual(next.update(event([['กาแฟ',false]])),{finalTranscript:'',interimTranscript:'กาแฟ'});
});
test('Initial nonzero resultIndex can bootstrap a complete results snapshot', () => {
  assert.deepEqual(createSession().update(event([['ข้าว 50 บาท',true],['แล้ว กาแฟ',false]],1)),{finalTranscript:'ข้าว 50 บาท',interimTranscript:'แล้ว กาแฟ'});
});
