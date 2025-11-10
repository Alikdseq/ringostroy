import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
// ВРЕМЕННО ОТКЛЮЧЕНО: Техника
// import Equipment from './pages/Equipment'
// import EquipmentCategory from './pages/EquipmentCategory';
import ServiceCategory from './pages/ServiceCategory';
// import EquipmentDetail from './pages/EquipmentDetail';
import ServiceDetail from './pages/ServiceDetail';
import YardImprovementService from './pages/service-pages/Page-1';
import TrenchDiggingService from './pages/service-pages/Page-2';
import SewerageService from './pages/service-pages/Page-3';
import RingsInstallationService from './pages/service-pages/Page-4';
import FBSBlocksService from './pages/service-pages/Page-5';
import BackfillFoundationService from './pages/service-pages/Page-6';
import SitePlanningService from './pages/service-pages/Page-7';
import TreeRemovalService from './pages/service-pages/Page-8';
import PileDrillingService from './pages/service-pages/Page-9';
import WasteRemovalService from './pages/service-pages/Page-10';
import MaterialDeliveryService from './pages/service-pages/Page-11';
import HydraulicHammerService from './pages/service-pages/Page-12';
import ExcavationService from './pages/service-pages/Page-13';
import FoundationDiggingService from './pages/service-pages/Page-14';
import ConcreteAsphaltCuttingService from './pages/service-pages/Page-15';
import MulchingService from './pages/service-pages/Page-16';
import FoundationConstructionService from './pages/service-pages/Page-17';
import FenceConstructionService from './pages/service-pages/Page-18';
import SnowRemovalService from './pages/service-pages/Page-19';
import Layout from './components/Layout'
import NotFound from './pages/NotFound';
import Promotions from './pages/Promotions';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* ВРЕМЕННО ОТКЛЮЧЕНО: Роуты техники
          <Route path="/equipment/:category" element={<EquipmentCategory />} />
          <Route path="/equipment/:slug" element={<EquipmentDetail />} />
          <Route path="/equipment" element={<Equipment />} />
          */}

          <Route path="/services/:category" element={<ServiceCategory />} />
          <Route path="/services/blagoustrojstvo-dvorov" element={<YardImprovementService />} />
          <Route path="/services/kopka-transej" element={<TrenchDiggingService />} />
          <Route path="/services/kanalizaciya-pod-klyuch" element={<SewerageService />} />
          <Route path="/services/dostavka-i-ustanovka-kolec" element={<RingsInstallationService />} />
          <Route path="/services/dostavka-i-ustanovka-fbs-blokov" element={<FBSBlocksService />} />
          <Route path="/services/obratnaya-zasypka-fundamentov" element={<BackfillFoundationService />} />
          <Route path="/services/planirovka-i-ochistka-uchastka" element={<SitePlanningService />} />
          <Route path="/services/srub-i-vyvoz-derevev" element={<TreeRemovalService />} />
          <Route path="/services/burenie-svaj-do-2-5-metrov" element={<PileDrillingService />} />
          <Route path="/services/vyvoz-stroitelnogo-i-lyubogo-musora" element={<WasteRemovalService />} />
          <Route path="/services/dostavka-chernozema-ballasta-shchebenki-peska" element={<MaterialDeliveryService />} />
          <Route path="/services/uslugi-gidromolota" element={<HydraulicHammerService />} />
          <Route path="/services/kopka-kotlovana" element={<ExcavationService />} />
          <Route path="/services/kopka-pod-fundament" element={<FoundationDiggingService />} />
          <Route path="/services/rezka-betona-i-asfalta" element={<ConcreteAsphaltCuttingService />} />
          <Route path="/services/pokos-travy-mulcherom" element={<MulchingService />} />
          <Route path="/services/stroitelstvo-fundamentov" element={<FoundationConstructionService />} />
          <Route path="/services/stroitelstvo-zaborov" element={<FenceConstructionService />} />
          <Route path="/services/raschistka-ili-uborka-snega" element={<SnowRemovalService />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/services" element={<Services />} />

          <Route path="/promotions" element={<Promotions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
