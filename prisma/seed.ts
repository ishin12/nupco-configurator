import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config({ path: ".env.local" });

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not found in .env.local");

const sql = neon(process.env.DATABASE_URL);
const adapter = new PrismaNeon(sql);
const prisma = new PrismaClient({ adapter });

const REGISTRY = [
  { id: "4215243400100", name: "AMALGAMATOR", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215000000600", name: "DENTAL UNIT DISABLE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215160003500", name: "LASER SOFT TISSUES DENTAL", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215150100300", name: "LIGHT CURING LED CORDLESS", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215160003600", name: "MICROSCOPE DENTAL CAMERA INTRAORAL", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215160007200", name: "MOTOR ENDO RECIPROCATING", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215160005400", name: "MOTOR SURGICAL DENTAL", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215169301300", name: "PLASTICIZER THERMO GUTTA PERCHA", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4217200100100", name: "POLISHING TOOTH DENTAL", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215163603100", name: "SCALER ULTRASONIC POLISHING TOOTH", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215160008200", name: "SCANNER PLATE DIGITAL", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215160008300", name: "SCANNER CONE BEAM COMPUTED TOMOGRAPHY (CBCT)", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4227250009300", name: "SEDATION KIT NITROUS OXIDE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215201200300", name: "SENSOR DIGITAL PERIAPICAL INTRAORAL RADIOGRAPH PEDIA", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215201200200", name: "SENSOR DIGITAL PERIAPICAL INTRAORAL RADIOGRAPH ADULT", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215165500200", name: "TESTER PULP VITALITY DIGITAL", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215200800900", name: "X-RAY PANORAMIC WITH CEPHALOMETRIC 2D", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4220180054800", name: "X-RAY WIRELESS PORTABLE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215220016000", name: "DENTAL UNIT SURGICAL MODULE INTEGRATED", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215220016600", name: "LASER DENTAL ALL TISSUE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215220016700", name: "PIEZOSURGERY DEVICE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215000001000", name: "DENTAL UNIT FOLDABLE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215230900000", name: "CAMERA INTRAORAL WITH CARIES DETECTOR", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215169100100", name: "LOCATOR APEX", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215169100200", name: "LIGHT POLYMERIZATION DENTAL RESIN", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215163603400", name: "SCALER ULTRASONIC AND AIR POLISHING", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215170500200", name: "DENTAL UNIT BASIC", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215170500400", name: "DENTAL UNIT ADVANCE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215200001600", name: "X-RAY DENTAL DIGITAL", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215170500500", name: "DENTAL UNIT MID RANGE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215150100000", name: "WHITENING LIGHT", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215201500000", name: "SCANNER FACE 3D", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215160010200", name: "WARMER COMPOSITE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215160010300", name: "MAINTENANCE HANDPIECE UNIT AUTOMATED", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215230100100", name: "LASER DENTAL ALL TISSUE ADVANCE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215290300100", name: "ANESTHESIA LOCAL DENTAL", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215161060400", name: "EXTRACT TOOTH MOTORIZED", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4200014169100", name: "X-RAY PANORAMIC", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4200014182800", name: "SCANNER INTRAORAL MOBILE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4215200900100", name: "SCANNER DENTAL PHOSPHOR PLATE", cat: "DENTAL", subcat: "DENTAL CLINIC" },
  { id: "4111150100200", name: "BALANCE TOP LOADING DIGITAL", cat: "DENTAL", subcat: "DENTAL LAB" },
  { id: "4215160003400", name: "LASER DETECTOR DENTAL CARIES", cat: "DENTAL", subcat: "DENTAL LAB" },
  { id: "4215220015800", name: "SCALE WEIGHING DIGITAL", cat: "DENTAL", subcat: "DENTAL LAB" },
  { id: "4215223000100", name: "PRINTER 3D DENTAL LAB", cat: "DENTAL", subcat: "DENTAL LAB" },
  { id: "4215223000200", name: "CADCAM LAB SIDE ADVANCE", cat: "DENTAL", subcat: "DENTAL LAB" },
  { id: "4215223000300", name: "CADCAM LAB SIDE BASIC", cat: "DENTAL", subcat: "DENTAL LAB" },
  { id: "4215223000400", name: "CADCAM CLINIC SIDE", cat: "DENTAL", subcat: "DENTAL LAB" },
  { id: "4215223107200", name: "SCANNER CADCAM LAB SIDE", cat: "DENTAL", subcat: "DENTAL LAB" },
  { id: "4214000000000", name: "CABINET STORAGE CATHETER", cat: "GENERAL", subcat: "CARTS & CABINETS" },
  { id: "4214000009700", name: "CABINET STORAGE GENERAL PURPOSE MOBILE", cat: "GENERAL", subcat: "CARTS & CABINETS" },
  { id: "4214000009800", name: "CABINET STORAGE GENERAL PURPOSE WALL MOUNTED", cat: "GENERAL", subcat: "CARTS & CABINETS" },
  { id: "4218190000900", name: "CART CRASH", cat: "GENERAL", subcat: "CARTS & CABINETS" },
  { id: "4219241200200", name: "CART DRESSING", cat: "GENERAL", subcat: "CARTS & CABINETS" },
  { id: "4214000001100", name: "CART TRACTION", cat: "GENERAL", subcat: "CARTS & CABINETS" },
  { id: "4219240400500", name: "TROLLEY STAINLESS STEEL", cat: "GENERAL", subcat: "CARTS & CABINETS" },
  { id: "4219240403800", name: "CART PROCEDURE", cat: "GENERAL", subcat: "CARTS & CABINETS" },
  { id: "4214000002900", name: "FLOWMETER AIR", cat: "GENERAL", subcat: "FLOW METER & REGULATORS" },
  { id: "4214000003000", name: "FLOWMETER AIR NEONATE", cat: "GENERAL", subcat: "FLOW METER & REGULATORS" },
  { id: "4214000003200", name: "FLOWMETER O2 15 L/MIN WALL MOUNTED", cat: "GENERAL", subcat: "FLOW METER & REGULATORS" },
  { id: "4214000003300", name: "FLOWMETER O2 NEONATE", cat: "GENERAL", subcat: "FLOW METER & REGULATORS" },
  { id: "4214000003400", name: "FLOWMETER O2 PEDIATRIC", cat: "GENERAL", subcat: "FLOW METER & REGULATORS" },
  { id: "4214000005600", name: "REGULATOR SUCTION HIGH WALL MOUNT", cat: "GENERAL", subcat: "FLOW METER & REGULATORS" },
  { id: "4214000005700", name: "REGULATOR SUCTION LOW NEONATAL", cat: "GENERAL", subcat: "FLOW METER & REGULATORS" },
  { id: "4229351105100", name: "REGULATOR SUCTION ADVANCE", cat: "GENERAL", subcat: "FLOW METER & REGULATORS" },
  { id: "4214000006900", name: "STOOL EXAMINATION", cat: "GENERAL", subcat: "CHAIRS & WHEELCHAIRS" },
  { id: "4214000007200", name: "STOOL SWIVEL MOBILE", cat: "GENERAL", subcat: "CHAIRS & WHEELCHAIRS" },
  { id: "4227220801200", name: "WALKER PATIENT", cat: "GENERAL", subcat: "CHAIRS & WHEELCHAIRS" },
  { id: "4219180003300", name: "WHEELCHAIR BARIATRIC", cat: "GENERAL", subcat: "CHAIRS & WHEELCHAIRS" },
  { id: "4219221011200", name: "CHAIR TRANSPORT SIZE 22", cat: "GENERAL", subcat: "CHAIRS & WHEELCHAIRS" },
  { id: "4214000003500", name: "HAMPER LINEN DOUBLE", cat: "GENERAL", subcat: "UTILITIES" },
  { id: "4214000003600", name: "HAMPER LINEN SINGLE", cat: "GENERAL", subcat: "UTILITIES" },
  { id: "4214000006600", name: "STAND IV", cat: "GENERAL", subcat: "UTILITIES" },
  { id: "4214000007500", name: "TABLE INSTRUMENT LARGE", cat: "GENERAL", subcat: "UTILITIES" },
  { id: "4214000007600", name: "TABLE INSTRUMENT SMALL", cat: "GENERAL", subcat: "UTILITIES" },
  { id: "4214000002500", name: "DIAGNOSTIC SET WALL MOUNTED", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4217000001200", name: "GLUCOMETER", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000003700", name: "HUMIDIFIER", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004200", name: "LIGHT EXAM MOBILE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004700", name: "OXIMETER PULSE DESKTOP", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004800", name: "OXIMETER PULSE HANDHELD", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190006500", name: "PUMP INFUSION INTRAVENOUS IV", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190006900", name: "PUMP INSULIN", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190007000", name: "PUMP SYRINGE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190007600", name: "SCAN DEVICE BLADDER", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000006300", name: "SPHYGMOMANOMETER ANEROID MOBILE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4217000002500", name: "THERMOMETER DIGITAL HANDHELD", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000008000", name: "THERMOMETER INFRARED", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190012500", name: "ECG 3 CHANNELS", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4229352200000", name: "SUCTION UNIT PORTABLE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218172500400", name: "DEFIBRILLATOR UNIT BASIC", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218170300400", name: "ECG 12 LEAD BASIC", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218170300300", name: "ECG 12 LEAD ADVANCE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218160200100", name: "SPHYGMOMANOMETER VITAL SIGN BASIC", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218160200000", name: "SPHYGMOMANOMETER VITAL SIGN ADVANCE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4222200101500", name: "PUMP INFUSION INTRAVENOUS IV ADVANCE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190020600", name: "PUMP SYRINGE ADVANCE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000006100", name: "SCALE CHAIR", cat: "GENERAL", subcat: "SCALES" },
  { id: "4214000005900", name: "SCALE INFANT", cat: "GENERAL", subcat: "SCALES" },
  { id: "4214000006000", name: "SCALE PATIENT WITH HEIGHT", cat: "GENERAL", subcat: "SCALES" },
  { id: "4218280100000", name: "SCALE DIAPER", cat: "GENERAL", subcat: "SCALES" },
  { id: "4214000007300", name: "SUCTION UNIT ELECTRICAL MOBILE", cat: "GENERAL", subcat: "SUCTIONS" },
  { id: "4218190000600", name: "ANALYZER BLOOD GAS BENCHTOP", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190000100", name: "ANALYZER BLOOD GAS POC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4229350003500", name: "ASSIST COUGH", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190001100", name: "DRAINAGE UNIT CHEST", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190002000", name: "EXTRACORPORIAL MEMBRANE OXYGENATION ECMO", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190005600", name: "MONITOR CEREBRAL OXIMETRY", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190002400", name: "MONITOR ICP", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190005800", name: "PACEMAKER CARDIAC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4219160607300", name: "PENDANT HORIZONTAL", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190006000", name: "PENDANT ICU DOUBLE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190007900", name: "MONITOR TELEMETRY SYSTEM", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190001500", name: "THROMBOSIS PREVENTION VIEN DEEP", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190009300", name: "VENTILATOR TRANSPORT MRI COMPATIBLE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190009400", name: "VENTILATOR TRANSPORT WITH MONITOR", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190009800", name: "WOUND CARE NEGATIVE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190009900", name: "WOUND CARE ULTRASONIC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4227170902000", name: "HIGH FLOW NASAL CANNULA : HFNC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190300100", name: "CARDIAC OUTPUT NON AND MINIMALLY INVASIVE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190004600", name: "MONITOR APNEA", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190004300", name: "MONITOR CAPNOGRAPHY", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4217210100200", name: "DEFIBRILLATOR UNIT ADVANCE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4227220500700", name: "VENTILATOR ICU ADULT AND PEDIATRIC ADVANCE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190019600", name: "MONITOR BEDSIDE ADULT PEDIATRIC ADVANCE 15 INCH", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190019300", name: "MONITOR BEDSIDE ADULT PEDIATRIC ADVANCE 19 INCH", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190012000", name: "MONITOR BEDSIDE ADULT PEDIATRIC BASIC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4227220500600", name: "VENTILATOR ICU ADULT AND PEDIATRIC BASIC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4227220500800", name: "VENTILATOR ICU ADULT AND PEDIATRIC MID RANGE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4219180005500", name: "BED INTENSIVE CARE ADVANCE", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4219180005600", name: "BED INTENSIVE CARE BASIC", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4219180005700", name: "BED ELECTRICAL BASIC", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4219180005800", name: "BED ELECTRICAL ADVANCE", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4219180005900", name: "BED ELECTRICAL MID RANGE", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4618181001100", name: "STRETCHER EMERGENCY", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4217000002700", name: "STRETCHER TRANSPORT", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4219220700200", name: "STRETCHER BASIC", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4219220700300", name: "STRETCHER MID RANGE", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4219220700400", name: "STRETCHER ADVANCE", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4219180000400", name: "BED ELECTRICAL BARIATRIC", cat: "IN-PATIENT", subcat: "BARIATRIC" },
  { id: "4219180000600", name: "BED INTENSIVE CARE BARIATRIC", cat: "IN-PATIENT", subcat: "BARIATRIC" },
];

async function main() {
  console.log("🌱 Seeding database...");

  const adminHash = await bcrypt.hash("Admin@2026", 12);
  const userHash = await bcrypt.hash("User@2026", 12);

  await prisma.user.upsert({
    where: { email: "admin@nupco.sa" },
    update: {},
    create: { email: "admin@nupco.sa", name: "NUPCO Admin", password: adminHash, role: "ADMIN" },
  });

  await prisma.user.upsert({
    where: { email: "user@nupco.sa" },
    update: {},
    create: { email: "user@nupco.sa", name: "Hospital Planner", password: userHash, role: "USER" },
  });

  console.log("✓ Users created");

  for (const item of REGISTRY) {
    await prisma.equipment.upsert({
      where: { id: item.id },
      update: { name: item.name, cat: item.cat, subcat: item.subcat },
      create: { id: item.id, name: item.name, cat: item.cat, subcat: item.subcat, price: 0, active: true },
    });
  }

  console.log(`✓ ${REGISTRY.length} equipment items seeded`);
  console.log("✅ Seeding complete!");
  console.log("\nLogin credentials:");
  console.log("  Admin: admin@nupco.sa / Admin@2026");
  console.log("  User:  user@nupco.sa  / User@2026");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
