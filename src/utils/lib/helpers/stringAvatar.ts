function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function darkenColor(color: string, percent: number) {
  const hex = color.substring(1);
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const darkenedR = Math.floor(r * (1 - percent / 100));
  const darkenedG = Math.floor(g * (1 - percent / 100));
  const darkenedB = Math.floor(b * (1 - percent / 100));

  const darkenedHex =
    "#" + (darkenedR * 65536 + darkenedG * 256 + darkenedB).toString(16).padStart(6, "0");

  return darkenedHex;
}

export function stringAvatar(name: string) {
  const bgColor = stringToColor(name);
  const textColor = darkenColor(bgColor, 40);

  return {
    sx: {
      bgcolor: bgColor,
      color: textColor,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
