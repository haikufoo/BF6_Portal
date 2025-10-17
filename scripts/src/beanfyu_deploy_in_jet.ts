//Provided by u/beanfyu on 2025/10/14, pulled from BF6 Ace gamemode
// Script starter
type Vector3 = { x: number, y: number, z: number };


export async function OnPlayerDeployed(player: mod.Player) {
const position = mod.GetSoldierState(player, mod.SoldierStateVector.GetPosition)
const playerArray = mod.AllPlayers()
const x_pos = mod.XComponentOf(position)
const y_pos = mod.YComponentOf(position)
const z_pos = mod.ZComponentOf(position)
const veh_pos = mod.CreateVector(x_pos+10,y_pos,z_pos)
const vec3: Vector3 = {x: x_pos, y: y_pos, z: z_pos}
const origin: Vector3 = {x: 0, y: 0, z: 0}
const vehSpawner = mod.SpawnObject(mod.RuntimeSpawn_Common.VehicleSpawner, veh_pos, ConverVector3ToModVector(getLookAtRotation(vec3,origin)))
mod.SetVehicleSpawnerVehicleType(vehSpawner, mod.VehicleList.F22)
mod.ForceVehicleSpawnerSpawn(vehSpawner)
await mod.Wait(0.1)
const closesVeh = GetUnoccupiedVehicleInRange(position)


if (closesVeh) {
mod.ForcePlayerToSeat(player, closesVeh, 0)
}
await mod.Wait(1)
if (mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier) == true) {
mod.AIBattlefieldBehavior(player)
mod.AISetTarget(player, mod.FarthestPlayerFrom(position))
}
}


export async function OnPlayerEarnedKill(player: mod.Player) {
const team = mod.GetTeam(player)
const score = mod.GetGameModeScore(team)
mod.SetGameModeScore(team, score+1)
}
function GetUnoccupiedVehicleInRange(pos: mod.Vector): mod.Vehicle | undefined {


const allVeh = mod.AllVehicles();


for (let index = 0; index < mod.CountOf(allVeh); index++) {
const veh = mod.ValueInArray(allVeh, index)
if (!mod.IsVehicleOccupied(veh)) {
const vehPos = mod.GetVehicleState(veh, mod.VehicleStateVector.VehiclePosition);
if (mod.DistanceBetween(pos, vehPos) <= 100) {
return veh;
}
}
}
console.log("Could not find vehicle close enough.")
return undefined
}


function getLookAtRotation(from: Vector3, to: Vector3): Vector3 {
const dx = to.x - from.x;
const dy = to.y - from.y;
const dz = to.z - from.z;


const distanceXZ = Math.sqrt(dx * dx + dz * dz);


const pitch = Math.atan2(dy, distanceXZ);
const yaw = Math.atan2(dx, dz);
const roll = 0;


return { x: pitch, y: yaw, z: roll };
}


export function ConverVector3ToModVector(vector3: Vector3): mod.Vector {
return mod.CreateVector(vector3.x, vector3.y, vector3.z)
}