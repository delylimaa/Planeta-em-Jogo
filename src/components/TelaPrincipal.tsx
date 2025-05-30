
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, UserPlus, Search, Calendar, LogOut, Users, UserCheck } from "lucide-react";
import TelaCadastrarMedico from "./TelaCadastrarMedico";
import TelaCadastrarPaciente from "./TelaCadastrarPaciente";
import TelaBuscarMedico from "./TelaBuscarMedico";
import TelaBuscarPaciente from "./TelaBuscarPaciente";
import TelaBuscarAtendimento from "./TelaBuscarAtendimento";
import TelaAgendarAtendimento from "./TelaAgendarAtendimento";

interface TelaPrincipalProps {
  onLogout: () => void;
}

const TelaPrincipal = ({ onLogout }: TelaPrincipalProps) => {
  const [telaAtiva, setTelaAtiva] = useState<string>('principal');

  const renderTela = () => {
    switch (telaAtiva) {
      case 'cadastrar-medico':
        return <TelaCadastrarMedico onVoltar={() => setTelaAtiva('principal')} />;
      case 'cadastrar-paciente':
        return <TelaCadastrarPaciente onVoltar={() => setTelaAtiva('principal')} />;
      case 'buscar-medico':
        return <TelaBuscarMedico onVoltar={() => setTelaAtiva('principal')} />;
      case 'buscar-paciente':
        return <TelaBuscarPaciente onVoltar={() => setTelaAtiva('principal')} />;
      case 'buscar-atendimento':
        return <TelaBuscarAtendimento onVoltar={() => setTelaAtiva('principal')} />;
      case 'agendar-atendimento':
        return <TelaAgendarAtendimento onVoltar={() => setTelaAtiva('principal')} />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Stethoscope className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Sistema de Clínica Médica</h1>
              <p className="text-gray-600">Escolha uma das opções abaixo para continuar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setTelaAtiva('cadastrar-medico')}>
                <CardHeader className="text-center">
                  <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Cadastrar Médico</CardTitle>
                  <CardDescription>Adicionar novo médico ao sistema</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setTelaAtiva('cadastrar-paciente')}>
                <CardHeader className="text-center">
                  <UserPlus className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Cadastrar Paciente</CardTitle>
                  <CardDescription>Adicionar novo paciente ao sistema</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setTelaAtiva('buscar-medico')}>
                <CardHeader className="text-center">
                  <Search className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Buscar Médico</CardTitle>
                  <CardDescription>Encontrar médicos cadastrados</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setTelaAtiva('buscar-paciente')}>
                <CardHeader className="text-center">
                  <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Buscar Paciente</CardTitle>
                  <CardDescription>Encontrar pacientes cadastrados</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setTelaAtiva('buscar-atendimento')}>
                <CardHeader className="text-center">
                  <Search className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Buscar Atendimento</CardTitle>
                  <CardDescription>Buscar atendimentos realizados</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setTelaAtiva('agendar-atendimento')}>
                <CardHeader className="text-center">
                  <Calendar className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Agendar Atendimento</CardTitle>
                  <CardDescription>Agendar novo atendimento</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Clínica Médica - Principal</h2>
          <Button 
            onClick={onLogout} 
            variant="outline" 
            className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderTela()}
        </div>
      </div>
    </div>
  );
};

export default TelaPrincipal;
