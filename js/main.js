// main.js - user activation and listing (final)
const btnCheck = document.getElementById('btnCheck');
const result = document.getElementById('result');
const listBox = document.getElementById('list');
const btnList = document.getElementById('btnList');

btnCheck.addEventListener('click', async ()=>{
  const key = document.getElementById('licenseKey').value.trim();
  const productId = document.getElementById('productId').value.trim();
  result.innerText = '';
  if(!key){ result.innerText = 'Masukkan license key'; return; }
  try{
    const q = await db.collection('licenses').where('licenseKey','==',key).limit(1).get();
    if(q.empty){ result.innerText = 'License tidak ditemukan'; return; }
    const doc = q.docs[0].data();
    if(productId && doc.productId && doc.productId !== productId){ result.innerText = 'License tidak valid untuk product ini'; return; }
    const expStr = doc.expiryDate || doc.expiresAt;
    if(expStr){
      const d = new Date(expStr);
      if(!isNaN(d.getTime())){
        if(d.getTime() < Date.now()){ result.innerText = 'License sudah kadaluarsa: ' + d.toISOString().split('T')[0]; return; }
      } else {
        if(doc.expiresAt && doc.expiresAt.toDate && doc.expiresAt.toDate().getTime() < Date.now()){ result.innerText = 'License sudah kadaluarsa'; return; }
      }
    }
    await db.collection('activations').add({ licenseKey: key, productId: doc.productId || productId || '', activatedAt: firebase.firestore.Timestamp.now() });
    result.innerText = 'License valid. Aktivasi dicatat.';
  }catch(err){
    console.error(err);
    result.innerText = 'Error: ' + (err.message || err);
  }
});

btnList.addEventListener('click', async ()=>{
  listBox.innerHTML = '<div class="small">Loading...</div>';
  try{
    const snap = await db.collection('licenses').orderBy('createdAt','desc').limit(200).get();
    if(snap.empty){ listBox.innerHTML = '<div class="small">Tidak ada lisensi</div>'; return; }
    let out = '<table class="table"><tr><th>Key</th><th>Product</th><th>Owner</th><th>Expiry</th></tr>';
    snap.forEach(doc=>{
      const d = doc.data();
      out += `<tr><td>${d.licenseKey||''}</td><td>${d.productId||''}</td><td>${d.userEmail||d.ownerEmail||''}</td><td>${d.expiryDate||''}</td></tr>`;
    });
    out += '</table>';
    listBox.innerHTML = out;
  }catch(err){ listBox.innerHTML = '<div class="small">Error loading: '+err.message+'</div>'; }
});
