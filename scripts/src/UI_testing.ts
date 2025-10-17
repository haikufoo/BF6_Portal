//global things
const buttonWhiteSpace = 50
const buttonSize: [number, number] =  [300,50]

// ==== player profiles
interface PlayerProfile {
    selectedVehicle?: string;
    vehicleUIRoot?: mod.UIWidget;
    buttonMap?: Map<mod.UIWidget, string>;
}
const playerProfiles = new Map<mod.Player, PlayerProfile>();

//=== on deploy
export async function OnPlayerDeployed(player: mod.Player) {
    //===enables ui , disable player movement
    mod.EnableUIInputMode(true,player)

    //==create a button
    CreateUIButton({
        name:'abutton',
        position: [-buttonSize[0], 0],
        size: buttonSize,
        label:'alabel'
    })
    //==pull the mod.button type of the button named ''
    let thebutton = mod.FindUIWidgetWithName('abutton')
    await mod.Wait(5)
    //pop the button as visible
    mod.SetUIWidgetVisible(thebutton, true)
    await mod.Wait(5)
    //pop the button as not visible
    mod.SetUIWidgetVisible(thebutton, false)
    await mod.Wait(5)
    //===enables ui , disable player movement
    mod.EnableUIInputMode(false,player)
}

function CreateUIButton(params: {
    name: string,
    position: [number, number],
    size: [number, number],
    anchor?: mod.UIAnchor,
    parent?: mod.UIWidget,
    label?: string,
    callback?: () => void
}) {
    mod.AddUIButton(
        params.name,
        __asModVector(params.position),
        __asModVector(params.size),
        params.anchor ?? mod.UIAnchor.Center,
        params.parent ?? mod.GetUIRoot(),
        false,                   // visible
        10,                      // padding / z
        __asModVector([0,0,0]), // default bg color
        1,                      // alpha
        mod.UIBgFill.None,     // fill
        true,                   // enabled
        __asModVector([1,1,1]), 1, // base button color + alpha
        __asModVector([0.5,0.5,0.5]), 1, // disabled
        __asModVector([0.8,0.8,0.8]), 1, // pressed
        __asModVector([0.9,0.9,0.9]), 1, // hover
        __asModVector([1,1,1]), 1,         // focused
    );
}

// turn a array into a vector
function __asModVector(param: number[] | mod.Vector) {
    if (Array.isArray(param))
        return mod.CreateVector(param[0], param[1], param.length == 2 ? 0 : param[2]);
    else
        return param;
}

