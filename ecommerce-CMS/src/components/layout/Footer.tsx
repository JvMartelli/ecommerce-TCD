import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#071021] text-slate-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-white font-bold text-lg">TechStore</div>
          <div className="mt-3 text-sm">Componentes de alta qualidade para seu PC.</div>
        </div>

        <div>
          <div className="font-semibold mb-2">Categorias</div>
          <div className="flex flex-col gap-1 text-sm">
            <Link to="/category/be0a2bdc-8c71-471f-aa63-5a7f608a718d" className="hover:text-white">Processadores</Link>
            <Link to="/category/0fd5db90-2dc2-4b69-b854-695c6d6ca6a2" className="hover:text-white">Placas-Mãe</Link>
            <Link to="/category/5dbaa9e0-1eeb-491f-97e7-614499d37a50" className="hover:text-white">Memória RAM</Link>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2">Contato</div>
          <div className="text-sm">email@techstore.com</div>
          <div className="text-sm mt-2">© {new Date().getFullYear()} TechStore</div>
        </div>
      </div>
    </footer>
  );
}
