(function () {
  "use strict";
  const KEYS = {users:"frc_users",donations:"frc_donations",requests:"frc_requests",session:"frc_session"};
  function dateOffset(days,hours=0){const d=new Date();d.setDate(d.getDate()+days);d.setHours(d.getHours()+hours);return d.toISOString();}
  function seedUsers(){return [
    {id:"u1",name:"Arun Kumar",email:"donor1@demo.com",password:"demo123",phone:"9000000001",role:"Donor",organisation:"Green Kitchen",location:"Kumbakonam"},
    {id:"u2",name:"Priya Foods",email:"donor2@demo.com",password:"demo123",phone:"9000000002",role:"Donor",organisation:"Priya Foods",location:"Thanjavur"},
    {id:"u3",name:"Ravi Kumar",email:"donor3@demo.com",password:"demo123",phone:"9000000003",role:"Donor",organisation:"Ravi Catering",location:"Trichy"},
    {id:"u4",name:"Meena",email:"donor4@demo.com",password:"demo123",phone:"9000000004",role:"Donor",organisation:"Meena Bakery",location:"Kumbakonam"},
    {id:"u5",name:"Karthik",email:"donor5@demo.com",password:"demo123",phone:"9000000005",role:"Donor",organisation:"Fresh Mart",location:"Thanjavur"},
    {id:"u6",name:"Helping Hands",email:"ngo1@demo.com",password:"demo123",phone:"9000000011",role:"NGO",organisation:"Helping Hands NGO",location:"Kumbakonam"},
    {id:"u7",name:"Care Foundation",email:"ngo2@demo.com",password:"demo123",phone:"9000000012",role:"NGO",organisation:"Care Foundation",location:"Thanjavur"},
    {id:"u8",name:"Hope Centre",email:"ngo3@demo.com",password:"demo123",phone:"9000000013",role:"NGO",organisation:"Hope Centre",location:"Trichy"},
    {id:"u9",name:"Project Admin",email:"admin@demo.com",password:"admin123",phone:"",role:"Admin",organisation:"Food Rescue Connect",location:"Tamil Nadu"}];}
  function seedDonations(){
    const rows=[
      ["d1","Vegetable Rice","Cooked Meals",20,"kg","Kumbakonam","Arun Kumar","u1",5],
      ["d2","Fresh Bananas","Fruits",15,"kg","Thanjavur","Priya Foods","u2",8],
      ["d3","Bread Packets","Bakery",30,"packs","Trichy","Ravi Kumar","u3",3],
      ["d4","Fresh Tomatoes","Vegetables",25,"kg","Kumbakonam","Arun Kumar","u1",10],
      ["d5","Sealed Biscuits","Packaged Food",40,"packs","Thanjavur","Priya Foods","u2",12],
      ["d6","Milk Packets","Dairy",10,"kg","Trichy","Ravi Kumar","u3",4],
      ["d7","Lemon Rice","Cooked Meals",18,"kg","Kumbakonam","Meena","u4",6],
      ["d8","Fresh Apples","Fruits",12,"kg","Thanjavur","Karthik","u5",9],
      ["d9","Carrot Bunches","Vegetables",16,"kg","Trichy","Meena","u4",7],
      ["d10","Veg Sandwiches","Cooked Meals",24,"packs","Kumbakonam","Karthik","u5",2]];
    return rows.map(r=>({id:r[0],name:r[1],category:r[2],quantity:r[3],unit:r[4],location:r[5],donorName:r[6],donorId:r[7],status:"Available",preparedAt:dateOffset(-1,-1),deadline:dateOffset(r[8]),storage:"Store in a clean, suitable environment.",packaging:"Clean sealed food-grade packaging.",image:""}));
  }
  function seedRequests(){return [
    {id:"r1",donationId:"d1",ngoId:"u6",ngoName:"Helping Hands",quantity:5,unit:"kg",status:"Pending",createdAt:dateOffset(-1)},
    {id:"r2",donationId:"d2",ngoId:"u7",ngoName:"Care Foundation",quantity:4,unit:"kg",status:"Accepted",createdAt:dateOffset(-2)},
    {id:"r3",donationId:"d3",ngoId:"u8",ngoName:"Hope Centre",quantity:10,unit:"packs",status:"Rejected",createdAt:dateOffset(-3)},
    {id:"r4",donationId:"d4",ngoId:"u6",ngoName:"Helping Hands",quantity:8,unit:"kg",status:"Picked Up",createdAt:dateOffset(-1)},
    {id:"r5",donationId:"d5",ngoId:"u7",ngoName:"Care Foundation",quantity:12,unit:"packs",status:"Completed",createdAt:dateOffset(-4)},
    {id:"r6",donationId:"d6",ngoId:"u8",ngoName:"Hope Centre",quantity:2,unit:"kg",status:"Pending",createdAt:dateOffset(0)},
    {id:"r7",donationId:"d7",ngoId:"u6",ngoName:"Helping Hands",quantity:6,unit:"kg",status:"Completed",createdAt:dateOffset(-5)},
    {id:"r8",donationId:"d8",ngoId:"u7",ngoName:"Care Foundation",quantity:3,unit:"kg",status:"Pending",createdAt:dateOffset(0)}];}
  function read(key,fallback){try{const raw=localStorage.getItem(key);if(!raw)return fallback;const value=JSON.parse(raw);if(Array.isArray(fallback)&&!Array.isArray(value))return fallback;return value;}catch(e){console.warn("Invalid local data",e);return fallback;}}
  function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch(e){console.error(e);return false;}}
  function getUsers(){return read(KEYS.users,[]);}function getDonations(){return read(KEYS.donations,[]);}function getRequests(){return read(KEYS.requests,[]);}
  function refreshExpired(){const ds=getDonations();let changed=false;ds.forEach(d=>{if(d.status==="Available"&&Date.parse(d.deadline)<=Date.now()){d.status="Expired";changed=true;}});if(changed)write(KEYS.donations,ds);}
  function init(){if(!localStorage.getItem(KEYS.users))write(KEYS.users,seedUsers());if(!localStorage.getItem(KEYS.donations))write(KEYS.donations,seedDonations());if(!localStorage.getItem(KEYS.requests))write(KEYS.requests,seedRequests());refreshExpired();}
  function makeId(prefix){return prefix+Date.now().toString(36)+Math.random().toString(36).slice(2,7);}
  function resetDemo(){Object.values(KEYS).forEach(k=>localStorage.removeItem(k));init();}
  window.FRC={init,getUsers,getDonations,getRequests,getSession:()=>read(KEYS.session,null),saveUsers:v=>write(KEYS.users,v),saveDonations:v=>write(KEYS.donations,v),saveRequests:v=>write(KEYS.requests,v),saveSession:v=>write(KEYS.session,v),clearSession:()=>localStorage.removeItem(KEYS.session),makeId,refreshExpired,resetDemo};
  init();
})();