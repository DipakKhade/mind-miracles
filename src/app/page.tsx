import Register from "@/components/Register";
import { Programs } from "@/components/Programs";

export default function Home() {
  return (  
 <main className="p-8">
  <div className="flex justify-between">
<div></div>
  <Register/>
  </div>
  <Programs/>
 </main>
  );
}
