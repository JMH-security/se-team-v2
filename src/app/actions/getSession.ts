export default async function GetSession() {
    const checkSession = await auth();
  
    if (checkSession) {
      console.log("Already logged in")
      redirect("/seteam");
      return Promise.resolve("Logged In - Valid Session");
    } else {
      
      return Promise.resolve("Login");
    
    }
  }
  