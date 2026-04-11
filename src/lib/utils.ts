export function makeConversationId(uid1: string, uid2: string): string {
  return [uid1, uid2].sort().join("_");
}
