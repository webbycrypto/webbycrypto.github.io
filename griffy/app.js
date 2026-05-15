const pairEndpoint =
  "https://api.dexscreener.com/latest/dex/pairs/solana/HMicZvhPJePexB8Szm1n57M3BskWNmiqgkqh6LZZ3Wpw";

const ticker = document.querySelector("[data-market-ticker]");
const terminalPrice = document.querySelector("[data-terminal-price]");
const terminalVolume = document.querySelector("[data-terminal-volume]");
const terminalLiquidity = document.querySelector("[data-terminal-liquidity]");
const terminalChange = document.querySelector("[data-terminal-change]");
const terminalTxns = document.querySelector("[data-terminal-txns]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu",
    );
    menu.classList.toggle("is-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menu.classList.remove("is-open");
    });
  });
}

const formatUsd = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "n/a";

  if (number > 0 && number < 0.000001) {
    return `$${number.toExponential(3)}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: number < 1 ? 10 : 2,
  }).format(number);
};

const formatCompactUsd = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "n/a";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);
};

const formatPercent = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "n/a";
  return `${number > 0 ? "+" : ""}${number.toFixed(2)}%`;
};

async function refreshTicker() {
  try {
    const response = await fetch(pairEndpoint, { cache: "no-store" });
    if (!response.ok) throw new Error(`Ticker request failed: ${response.status}`);

    const data = await response.json();
    const pair = data.pairs?.[0];
    if (!pair) throw new Error("No GRFY pair returned");

    const price = formatUsd(pair.priceUsd);
    const volume = formatCompactUsd(pair.volume?.h24);
    const liquidity = formatCompactUsd(pair.liquidity?.usd);
    const change = formatPercent(pair.priceChange?.h24);
    const buys = Number(pair.txns?.h24?.buys ?? 0);
    const sells = Number(pair.txns?.h24?.sells ?? 0);

    if (ticker) {
      ticker.innerHTML = `
        <span>Price: ${price}</span>
        <span>24h Volume: ${volume}</span>
        <span>Liquidity: ${liquidity}</span>
        <span>24h Change: ${change}</span>
      `;
    }

    if (terminalPrice) terminalPrice.textContent = price;
    if (terminalVolume) terminalVolume.textContent = `24h Volume: ${volume}`;
    if (terminalLiquidity) terminalLiquidity.textContent = `Liquidity: ${liquidity}`;
    if (terminalChange) terminalChange.textContent = `24h Change: ${change}`;
    if (terminalTxns) terminalTxns.textContent = `24h Txns: ${buys + sells}`;
  } catch (error) {
    if (ticker) {
      ticker.innerHTML = `
        <span>Price: open chart</span>
        <span>24h Volume: open chart</span>
        <span>Liquidity: open chart</span>
        <span>24h Change: open chart</span>
      `;
    }

    if (terminalPrice) terminalPrice.textContent = "Open live chart";
    if (terminalVolume) terminalVolume.textContent = "24h Volume: open chart";
    if (terminalLiquidity) terminalLiquidity.textContent = "Liquidity: open chart";
    if (terminalChange) terminalChange.textContent = "24h Change: open chart";
    if (terminalTxns) terminalTxns.textContent = "24h Txns: open chart";
    console.warn(error);
  }
}

refreshTicker();
window.setInterval(refreshTicker, 60_000);
