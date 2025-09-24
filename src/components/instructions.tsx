import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import Command from "./ui/Command";

export default function Instructions() {
  return (
    <div className="space-y-8">
      <div className="p-4 border border-zinc-800 rounded-lg flex flex-col gap-8 ">
        <div className="space-y-4">
          <h1 className="text-lg font-bold">
            Arrombe o cofre, inspirado no The Last of Us 2
          </h1>
          <div className="space-y-3">
            <p className="opacity-60 text-sm">
              Abra o cofre apenas pelo ouvido: cada dígito emite um som diferente e,
              quando o número está correto, um sinal sutil e distinto confirma sua
              escolha. Treine sua escuta, decifre a sequência e vença o desafio sem dicas.
            </p>

            <p className="opacity-60 text-sm">
              Ao clicar para aumentar ou diminuir o número, um som é emitido. Quando o
              número correto for alcançado, o som será sutilmente diferente, indicando que
              esse é o número certo. Para uma experiência mais imersiva, utilize fones de
              ouvido e perceba melhor as variações de som.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border border-zinc-800 rounded-lg flex flex-col gap-8 ">
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Comandos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Command
              content={<ArrowUp size={20} />}
              description="Incrementar número do par selecionado"
            />

            <Command
              content={<ArrowDown size={20} />}
              description="Decrementar número do par selecionado"
            />

            <Command
              content={<ArrowRight size={20} />}
              description="Selecionar próximo par (direita)"
            />

            <Command
              content={<ArrowLeft size={20} />}
              description="Selecionar par anterior (esquerda)"
            />

            <Command content="Tab" description="Navegar entre os pares" />

            <Command content="Enter" description="Tentar abrir o cofre" />
          </div>
        </div>
      </div>
    </div>
  );
}
