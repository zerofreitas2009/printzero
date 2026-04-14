export const PRINTZERO_TABLE_PREFIX = "pz_";

/**
 * Padroniza nomes de tabelas do projeto PrintZero.
 * Ex.: tbl("lead_events") => "pz_lead_events"
 */
export function tbl(table: string) {
  const normalized = table.trim();
  return `${PRINTZERO_TABLE_PREFIX}${normalized}`;
}
