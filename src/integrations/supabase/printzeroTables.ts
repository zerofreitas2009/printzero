export const PRINTZERO_TABLE_PREFIX = "printzero_";

/**
 * Padroniza nomes de tabelas do projeto PrintZero.
 * Ex.: tbl("clientes") => "printzero_clientes"
 */
export function tbl(table: string) {
  const normalized = table.trim();
  return `${PRINTZERO_TABLE_PREFIX}${normalized}`;
}
