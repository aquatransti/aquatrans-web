import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { SobrePage } from "./pages/SobrePage";
import { ServicosPage } from "./pages/ServicosPage";
import { EventosPage } from "./pages/EventosPage";
import { TransparenciaPage } from "./pages/TransparenciaPage";
import { ApadrinhamentoPage } from "./pages/ApadrinhamentoPage";
import { ContatoPage } from "./pages/ContatoPage";

// v1 (go-live): apenas páginas públicas.
// Login e dashboards (aluno/professor/gestor/admin) permanecem no código,
// mas estão fora das rotas até a v2 (quando houver backend/persistência).
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", Component: HomePage },
      { path: "/sobre", Component: SobrePage },
      { path: "/servicos", Component: ServicosPage },
      { path: "/eventos", Component: EventosPage },
      { path: "/transparencia", Component: TransparenciaPage },
      { path: "/apadrinhamento", Component: ApadrinhamentoPage },
      { path: "/contato", Component: ContatoPage },
    ],
  },
]);
