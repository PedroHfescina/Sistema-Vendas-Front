import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from "../components/Layout";
import Dashboard from '../pages/Dashboard';
import List from '../pages/Produtos';
import CadastroEstoque from '../pages/Cadastro_Estoque';

const AppRoutes: React.FC = () => (

    <Layout>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/list/:type" element={<List />} />
            <Route path="/cadastro_estoque" element={<CadastroEstoque />} />
        </Routes>
    </Layout>
);

export default AppRoutes;
