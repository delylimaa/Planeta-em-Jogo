
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Stethoscope } from "lucide-react";
import TelaPrincipal from "@/components/TelaPrincipal";

const Index = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const realizarLogin = () => {
    if (usuario === 'admin' && senha === '123') {
      toast.success("Login realizado com sucesso!");
      setLoggedIn(true);
    } else {
      toast.error("Usuário ou senha inválidos!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      realizarLogin();
    }
  };

  if (loggedIn) {
    return <TelaPrincipal onLogout={() => setLoggedIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Clínica Médica</CardTitle>
          <CardDescription>Entre com suas credenciais para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usuario">Usuário</Label>
            <Input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite seu usuário"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua senha"
              className="h-11"
            />
          </div>
          <Button 
            onClick={realizarLogin} 
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Entrar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
