// import { MAINTENANCE } from '../data';

// const styles = `
// .maint-grid {
//   display: grid; grid-template-columns: repeat(3,1fr);
//   gap: 1px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.06);
// }
// .maint-cell {
//   background: #03080f; padding: 40px 34px;
//   position: relative; overflow: hidden; transition: background .25s;
// }
// .maint-cell:hover { background: #060f1e; }
// .maint-cell.pro { background: #040c1a; }
// .maint-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; }
// .maint-line.basic    { background: #243040; }
// .maint-line.standard { background: linear-gradient(90deg,#1d6ff2,#00c8ff); }
// .maint-line.premium  { background: linear-gradient(90deg,#ff6b35,#ffb830); }
// .maint-lbl {
//   font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
//   color: #6a7d94; margin-bottom: 10px;
// }
// .maint-name {
//   font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: .03em;
// }
// .maint-price {
//   font-family: 'Bebas Neue', sans-serif; font-size: 50px; line-height: 1.05;
// }
// .maint-per { font-size: 12px; font-weight: 300; color: #6a7d94; margin: 4px 0 22px; }
// .maint-feats { list-style: none; display: flex; flex-direction: column; gap: 9px; }
// .maint-feats li {
//   font-size: 13px; font-weight: 300; color: rgba(255,255,255,.55);
//   display: flex; align-items: center; gap: 9px;
// }
// .maint-feats .ck { color: #00e887; font-weight: 700; flex-shrink: 0; }

// /* Notes box */
// .notes-box {
//   margin-top: 60px; padding: 26px 28px;
//   border: 1px solid rgba(255,180,0,.12);
//   border-left: 2px solid #ffb830;
//   background: rgba(255,184,48,.02);
// }
// .notes-ttl {
//   font-family: 'Bebas Neue', sans-serif; font-size: 19px;
//   letter-spacing: .05em; color: #ffb830; margin-bottom: 14px;
// }
// .notes-list { list-style: none; display: flex; flex-direction: column; gap: 9px; }
// .notes-list li {
//   font-size: 13px; font-weight: 300; color: rgba(255,255,255,.6);
//   display: flex; gap: 10px;
// }
// .notes-list li::before {
//   content: '◆'; color: #ffb830; font-size: 7px; flex-shrink: 0; margin-top: 5px;
// }

// @media (max-width:768px) {
//   .maint-grid { grid-template-columns: 1fr; }
//   .maint-cell { padding: 30px 24px; }
//   .maint-price { font-size: 44px; }
//   .notes-box { padding: 22px 20px; }
// }
// `;

// export default function Maintenance() {
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="s-wrap" id="maintenance">
//         <div className="s-inner">
//           <div className="rev">
//             <div className="s-eyebrow">Maintenance Plans</div>
//             <h2 className="s-title">Keep It <em>Running</em></h2>
//             <p className="s-body">
//               Monthly plans to keep your website fast, secure, and always up-to-date.
//               Focus on your business — we handle the rest.
//             </p>
//           </div>

//           <div className="maint-grid">
//             {MAINTENANCE.map((m, i) => (
//               <div key={i} className={`rev d${i + 1}`}>
//                 <div className={`maint-cell${m.pro ? ' pro' : ''}`}>
//                   <div className={`maint-line ${m.tier}`} />
//                   <div className="maint-lbl">Plan 0{i + 1}</div>
//                   <div className="maint-name">{m.name}</div>
//                   <div className="maint-price">{m.price}</div>
//                   <div className="maint-per">{m.period}</div>
//                   <ul className="maint-feats">
//                     {m.features.map((f, j) => (
//                       <li key={j}>
//                         <span className="ck">✓</span>{f}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Important Notes */}
//           <div className="rev">
//             <div className="notes-box">
//               <div className="notes-ttl">⚠ Important Notes</div>
//               <ul className="notes-list">
//                 <li>Domain &amp; Hosting charges are not included in any package.</li>
//                 <li>50% advance payment required before project commencement.</li>
//                 <li>Remaining 50% due upon project completion and handover.</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
