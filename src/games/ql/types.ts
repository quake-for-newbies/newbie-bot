export interface ServerListReponse {
  retrievalDate: string;
  timestamp: number;
  serverCount: number;
  servers: Server[];
  failedCount: number;
  failedServers: any[];
}

export interface Server {
  serverID: number;
  address: string;
  game: ServerGame;
  ip: string;
  port: number;
  location: Location;
  info: Info;
  players: Player[];
  filteredPlayers: FilteredPlayers;
  rules: Rules;
}

export interface FilteredPlayers {
  count: number;
  players: Player[];
}

export interface Player {
  name: string;
  score: number;
  secsConnected: number;
  totalConnected: string;
}

export enum ServerGame {
  QuakeLive = "QuakeLive",
}

export interface Info {
  protocol: number;
  serverName: string;
  map: string;
  gameDir: GameDir;
  game: GameTypeFullEnum;
  gameTypeShort: GameTypeShort;
  gameTypeFull: GameTypeFullEnum;
  steamApp: number;
  players: number;
  maxPlayers: number;
  bots: number;
  serverType: ServerType;
  serverOS: ServerOS;
  private: number;
  antiCheat: number;
  serverVersion: string;
  extra: Extra;
}

export interface Extra {
  gamePort: number;
  serverSteamID: number;
  sourceTvProxyPort: number;
  sourceTvProxyName: string;
  keywords: string;
  steamAppID: number;
}

export enum GameTypeFullEnum {
  AttackAndDefend = "Attack and Defend",
  AttackDefend = "Attack & Defend",
  CaptureTheFlag = "Capture the Flag",
  ClanArena = "Clan Arena",
  Domination = "Domination",
  Duel = "Duel",
  FreeForAll = "Free For All",
  FreezeTag = "Freeze Tag",
  GameCaptureTheFlag = "Capture The Flag",
  Race = "Race",
  RedRover = "Red Rover",
  TeamDeathmatch = "Team Deathmatch",
}

export enum GameDir {
  Baseq3 = "baseq3",
}

export enum GameTypeShort {
  Ad = "AD",
  CA = "CA",
  Ctf = "CTF",
  DOM = "DOM",
  Duel = "Duel",
  Ffa = "FFA",
  Ft = "FT",
  Race = "Race",
  Rr = "RR",
  Tdm = "TDM",
}

export enum ServerOS {
  Linux = "Linux",
  Windows = "Windows",
}

export enum ServerType {
  Dedicated = "dedicated",
  Listen = "listen",
}

export interface Location {
  countryName: string;
  countryCode: string;
  region: Region;
  state: State;
}

export enum Region {
  Africa = "Africa",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}

export enum State {
  CA = "CA",
  FL = "FL",
  Ga = "GA",
  IL = "IL",
  Ia = "IA",
  Ky = "KY",
  Nj = "NJ",
  None = "None",
  Ny = "NY",
  Oh = "OH",
  Pa = "PA",
  Sc = "SC",
  Tx = "TX",
  Unknown = "Unknown",
  Va = "VA",
  Wa = "WA",
}

export interface Rules {
  capturelimit: string;
  dmflags: string;
  fraglimit: string;
  g_adCaptureScoreBonus: string;
  g_adElimScoreBonus: string;
  g_adTouchScoreBonus: string;
  g_blueScore: string;
  g_customSettings: string;
  g_factory: string;
  g_factoryTitle: string;
  g_freezeRoundDelay: string;
  g_gameState: GGameState;
  g_gametype: string;
  g_gravity: string;
  g_instaGib?: string;
  g_itemHeight: string;
  g_itemTimers: string;
  g_levelStartTime: string;
  g_loadout: string;
  g_needpass: string;
  g_overtime: string;
  g_quadDamageFactor: string;
  g_redScore: string;
  g_roundWarmupDelay: string;
  g_startingHealth: string;
  g_teamForceBalance: string;
  g_teamSizeMin: string;
  g_timeoutCount: string;
  g_voteFlags?: string;
  g_weaponRespawn: string;
  mapname: string;
  mercylimit: string;
  protocol: string;
  roundlimit: string;
  roundtimelimit: string;
  scorelimit: string;
  sv_hostname: string;
  sv_maxclients?: string;
  sv_privateClients?: string;
  teamsize: string;
  timelimit: string;
  version: Version;
  sv_maxClients?: string;
  bot_minplayers?: string;
  g_voteflags?: string;
  sv_privateclients?: string;
  g_enableDust?: string;
  bot_autoManage?: string;
  g_instagib?: string;
}

export enum GGameState {
  CountDown = "COUNT_DOWN",
  InProgress = "IN_PROGRESS",
  PreGame = "PRE_GAME",
}

export enum Version {
  The1069LinuxI386Jun32016205343 = "1069 linux-i386 Jun  3 2016 20:53:43",
  The1069LinuxX64Jun32016205350 = "1069 linux-x64 Jun  3 2016 20:53:50",
  The1069WinX86Jun32016160918 = "1069 win-x86 Jun  3 2016 16:09:18",
}
