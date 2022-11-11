export interface Chamado {
    id?:                any;
    dataAbertura?:   string;
    dataFechamento?: string;
    prioridade:      string;
    status:          string;
    tipoManutencao:  string;
    categoriaManutencao: string;
    defeitos:          any;
    observacoes:     string;
    obsTec:          string;
    tecnico:            any;
    cliente:            any;
    gestor:             any;    
    maquina:            any;
    nomeCliente:     string;
    nomeGestor:      string;
    nomeTecnico:     string;
    nomeMaquina:     String;
    nomeDefeitos:    String;
    parada:          String;
 }