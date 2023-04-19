import React from "react";
import Avatar from "avataaars";

const avatarSpecs = {
  topType: [
    "NoHair",
    "Eyepatch",
    "Hat",
    "Hijab",
    "Turban",
    "WinterHat1",
    "WinterHat2",
    "WinterHat3",
    "WinterHat4",
    "LongHairBigHair",
    "LongHairBob",
    "LongHairBun",
    "LongHairCurly",
    "LongHairCurvy",
    "LongHairDreads",
    "LongHairFrida",
    "LongHairFro",
    "LongHairFroBand",
    "LongHairNotTooLong",
    "LongHairShavedSides",
    "LongHairMiaWallace",
    "LongHairStraight",
    "LongHairStraight2",
    "LongHairStraightStrand",
    "ShortHairDreads01",
    "ShortHairDreads02",
    "ShortHairFrizzle",
    "ShortHairShaggyMullet",
    "ShortHairShortCurly",
    "ShortHairShortFlat",
    "ShortHairShortRound",
    "ShortHairShortWaved",
    "ShortHairSides",
    "ShortHairTheCaesar",
    "ShortHairTheCaesarSidePart",
  ],
  accessoriesType: [
    "Blank",
    "Kurt",
    "Prescription01",
    "Prescription02",
    "Round",
    "Sunglasses",
    "Wayfarers",
  ],
  hatColor: [
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White",
  ],
  hairColor: [
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "PastelPink",
    "Platinum",
    "Red",
    "SilverGray",
  ],
  facialHairType: [
    "Blank",
    "BeardMedium",
    "BeardLight",
    "BeardMajestic",
    "MoustacheFancy",
    "MoustacheMagnum",
  ],
  facialHairColor: [
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "Platinum",
    "Red",
  ],
  clotheType: [
    "BlazerShirt",
    "BlazerSweater",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "ShirtCrewNeck",
    "ShirtScoopNeck",
    "ShirtVNeck",
  ],
  clotheColor: [
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White",
  ],
  graphicType: [
    "Bat",
    "Cumbia",
    "Deer",
    "Diamond",
    "Hola",
    "Pizza",
    "Resist",
    "Selena",
    "Bear",
    "SkullOutline",
    "Skull",
  ],
  eyeType: [
    "Close",
    "Cry",
    "Default",
    "Dizzy",
    "EyeRoll",
    "Happy",
    "Hearts",
    "Side",
    "Squint",
    "Surprised",
    "Wink",
    "WinkWacky",
  ],
  eyebrowType: [
    "Angry",
    "AngryNatural",
    "Default",
    "DefaultNatural",
    "FlatNatural",
    "RaisedExcited",
    "RaisedExcitedNatural",
    "SadConcerned",
    "SadConcernedNatural",
    "UnibrowNatural",
    "UpDown",
    "UpDownNatural",
  ],
  mouthType: [
    "Concerned",
    "Default",
    "Disbelief",
    "Eating",
    "Grimace",
    "Sad",
    "ScreamOpen",
    "Serious",
    "Smile",
    "Tongue",
    "Twinkle",
    "Vomit",
  ],
  skinColor: [
    "Tanned",
    "Yellow",
    "Pale",
    "Light",
    "Brown",
    "DarkBrown",
    "Black",
  ],
};

interface avatarProps {
  index: number;
}

const GenerateAvatar: React.FC<avatarProps> = ({ index }) => {
  const randomIndex = (spec: string[]) =>
    Math.floor(Math.random() * spec.length);

  const generateRandomImage = (spec: string[]) =>
    spec[index] || spec[randomIndex(spec)];

  return (
    <Avatar
      className="w-16 h-16 shadow-lg"
      avatarStyle="Circle"
      topType={generateRandomImage(avatarSpecs.topType)}
      accessoriesType={generateRandomImage(avatarSpecs.accessoriesType)}
      hairColor={generateRandomImage(avatarSpecs.hairColor)}
      facialHairType={generateRandomImage(avatarSpecs.facialHairType)}
      clotheType={generateRandomImage(avatarSpecs.clotheType)}
      clotheColor={generateRandomImage(avatarSpecs.clotheColor)}
      eyeType={generateRandomImage(avatarSpecs.eyeType)}
      eyebrowType={generateRandomImage(avatarSpecs.eyebrowType)}
      mouthType={generateRandomImage(avatarSpecs.mouthType)}
      skinColor={generateRandomImage(avatarSpecs.skinColor)}
    />
  );
};

export default GenerateAvatar;

export const GenerateAvatarHeader: React.FC<{
  role: string;
  isHeader?: boolean;
  isProfile?: boolean;
}> = ({ role, isHeader, isProfile }) => {
  const styles = isHeader
    ? {
        width: "64px",
        height: "54px",
        marginBottom: "6px",
      }
    : isProfile
    ? { width: "128px", height: "128px" }
    : { width: "64px", height: "64px" };
  if (role == "doctor")
    return (
      <Avatar
        style={styles}
        avatarStyle="Circle"
        topType="WinterHat1"
        accessoriesType="Prescription01"
        // hatColor="Blue03"
        hairColor="Auburn"
        facialHairType="Blank"
        facialHairColor="Auburn"
        clotheType="ShirtVNeck"
        clotheColor="Blue02"
        eyeType="Surprised"
        eyebrowType="RaisedExcitedNatural"
        mouthType="Sad"
        skinColor="Light"
      />
    );
  else if (role == "patient")
    return (
      <Avatar
        style={styles}
        avatarStyle="Circle"
        topType="ShortHairTheCaesar"
        accessoriesType="Prescription01"
        hairColor="Black"
        facialHairType="Blank"
        facialHairColor="Brown"
        clotheType="ShirtCrewNeck"
        clotheColor="Gray02"
        eyeType="Surprised"
        eyebrowType="SadConcernedNatural"
        mouthType="Twinkle"
        skinColor="Pale"
      />
    );
  return (
    <Avatar
      style={styles}
      avatarStyle="Circle"
      topType="ShortHairTheCaesarSidePart"
      accessoriesType="Kurt"
      hairColor="Auburn"
      facialHairType="BeardMajestic"
      facialHairColor="Red"
      clotheType="ShirtVNeck"
      clotheColor="Black"
      eyeType="Surprised"
      eyebrowType="Angry"
      mouthType="Disbelief"
      skinColor="Tanned"
    />
  );
};

{
  /* <Avatar
  avatarStyle="Circle"
  topType="ShortHairSides"
  accessoriesType="Prescription01"
  hairColor="SilverGray"
  facialHairType="BeardLight"
  facialHairColor="Red"
  clotheType="CollarSweater"
  clotheColor="PastelBlue"
  eyeType="EyeRoll"
  eyebrowType="UnibrowNatural"
  mouthType="Serious"
  skinColor="Tanned"
/>; */
}
