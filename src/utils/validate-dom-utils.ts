export function isButtonActiveKey(key: string) {
  return ['Spacebar', 'Enter', ' '].includes(key);
}

export function isLinkActiveKey(key: string) {
  return key === 'Enter';
}
