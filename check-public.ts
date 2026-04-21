
import fetch from "node-fetch";

async function checkPublic() {
  const url = "https://nexus-social-51352-default-rtdb.firebaseio.com/ai_generated_lessons.json?shallow=true";
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

checkPublic();
