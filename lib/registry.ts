export interface RegistryItem {
  id: string;
  name: string;
  cat: string;
  subcat: string;
}

export interface IhfgItem {
  name: string;
  subcat: string;
  qty: number;
  critical: boolean;
  code: string;
  reasoning: string;
}

export interface IhfgStandard {
  minArea: number;
  desc: string;
  items: IhfgItem[];
}

export interface PositionDef {
  x: number; y: number; w: number; h: number;
}

export const REGISTRY: RegistryItem[] = [
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
  { id: "4215160006400", name: "COMPRESSOR CENTRAL DENTAL 02 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215160002900", name: "COMPRESSOR CENTRAL DENTAL 10 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215160006600", name: "COMPRESSOR CENTRAL DENTAL 4 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215160007300", name: "RO CENTRAL DENTAL 02 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215160007400", name: "RO CENTRAL DENTAL 10 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215160007500", name: "RO CENTRAL DENTAL 20 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215160007600", name: "RO CENTRAL DENTAL 30 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215160007700", name: "RO CENTRAL DENTAL 4 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215160007800", name: "RO CENTRAL DENTAL 40 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215160007900", name: "RO CENTRAL DENTAL 50 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215163500800", name: "SUCTION CENTRAL DENTAL 02 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215163500900", name: "SUCTION CENTRAL DENTAL 10 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215163501200", name: "SUCTION CENTRAL DENTAL 4 CLINICS", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4015160100100", name: "COMPRESSOR AIR OIL LESS DENTAL", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4215170600700", name: "SUCTION UNIT DENTAL 1 UNIT", cat: "DENTAL", subcat: "DENTAL MECHANICAL EQP" },
  { id: "4230151102600", name: "SIMULATOR PHANTOM SELF ASSESSMENT", cat: "DENTAL", subcat: "DENTAL EDUCATION" },
  { id: "4215000000300", name: "CHAIR DENTAL PORTABLE", cat: "DENTAL", subcat: "DENTAL EDUCATION" },
  { id: "4215160009800", name: "ASSESSMENT DENTAL CASE FOR DIAGNOSIS AND TREATMENT PLAN GENERAL", cat: "DENTAL", subcat: "SOLUTIONS & SOFTWARE" },
  { id: "4215160009900", name: "ASSESSMENT DENTAL CASE FOR DIAGNOSIS AND TREATMENT PLAN ENDODONTIC", cat: "DENTAL", subcat: "SOLUTIONS & SOFTWARE" },
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
  { id: "4214000002600", name: "DOPPLER FETAL HEART HANDHELD", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000002700", name: "DOPPLER FETAL HEART TABLETOP", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4217000001200", name: "GLUCOMETER", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000003700", name: "HUMIDIFIER", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000003800", name: "LAMP WARMER", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004100", name: "LIGHT EXAM CEILING MOUNTED", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004200", name: "LIGHT EXAM MOBILE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004300", name: "LIGHT EXAM WALL MOUNTED", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190003600", name: "MATTRESS AIR LOW RISK", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4227220800600", name: "MATTRESS AIR MED RISK", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004400", name: "NEBULIZER ULTRASONIC", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004500", name: "OTOSCOPE TABLETOP", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004600", name: "OTOSCOPE WALL MOUNTED", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004700", name: "OXIMETER PULSE DESKTOP", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000004800", name: "OXIMETER PULSE HANDHELD", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4223151100000", name: "PUMP FEEDING SYRINGE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190006500", name: "PUMP INFUSION INTRAVENOUS IV", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190006900", name: "PUMP INSULIN", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190007000", name: "PUMP SYRINGE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000005000", name: "PURIFIER AIR LARGE AREA", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000005100", name: "PURIFIER AIR SMALL AREA", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190007600", name: "SCAN DEVICE BLADDER", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000006300", name: "SPHYGMOMANOMETER ANEROID MOBILE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000006400", name: "SPHYGMOMANOMETER ANEROID WALL", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4217000002500", name: "THERMOMETER DIGITAL HANDHELD", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000008000", name: "THERMOMETER INFRARED", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000008100", name: "THERMOMETER TYMPANIC", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190008000", name: "TRANSILLUMINATOR VEIN HANDHELD", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4410240800000", name: "LABEL PRINTING MEDICAL", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190012500", name: "ECG 3 CHANNELS", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4227220800500", name: "MATTRESS AIR HIGH RISK", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4229352200000", name: "SUCTION UNIT PORTABLE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218200501400", name: "OTO OPHTHALMOSCOPE WALL MOUNT", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4219210700400", name: "CHAIR RECLINER PROCEDURE ELECTRIC", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4219210200100", name: "CHAIR RECLINER MANUAL", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4117150000100", name: "DIAGNOSTIC SET DESKTOP", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218172500400", name: "DEFIBRILLATOR UNIT BASIC", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218170300400", name: "ECG 12 LEAD BASIC", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218170300500", name: "ECG 12 LEAD MID RANGE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218170300300", name: "ECG 12 LEAD ADVANCE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218160200100", name: "SPHYGMOMANOMETER VITAL SIGN BASIC", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218160200000", name: "SPHYGMOMANOMETER VITAL SIGN ADVANCE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190400600", name: "SPHYGMOMANOMETER VITAL SIGN MID RANGE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4222200101500", name: "PUMP INFUSION INTRAVENOUS IV ADVANCE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218190020600", name: "PUMP SYRINGE ADVANCE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218150200300", name: "TRANSILLUMINATOR VEIN ADVANCE", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4218191811100", name: "DIAGNOSTIC SET WALL MOUNTED ADVANCED", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4200012423000", name: "PUMP INFUSION AMBULATORY", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4110510400800", name: "PUMP SYRINGE AMBULATORY", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4219000085100", name: "CAMERA INFRARED HANDHELD", cat: "GENERAL", subcat: "COMMON EQP" },
  { id: "4214000006100", name: "SCALE CHAIR", cat: "GENERAL", subcat: "SCALES" },
  { id: "4214000005900", name: "SCALE INFANT", cat: "GENERAL", subcat: "SCALES" },
  { id: "4214000006000", name: "SCALE PATIENT WITH HEIGHT", cat: "GENERAL", subcat: "SCALES" },
  { id: "4214000006200", name: "SCALE WHEELCHAIR", cat: "GENERAL", subcat: "SCALES" },
  { id: "4218280100000", name: "SCALE DIAPER", cat: "GENERAL", subcat: "SCALES" },
  { id: "4111161400100", name: "STADIOMETER DIGITAL WALL MOUNTED", cat: "GENERAL", subcat: "SCALES" },
  { id: "4111150900400", name: "SCALE PATIENT WITH HEIGHT AUTOMATED", cat: "GENERAL", subcat: "SCALES" },
  { id: "4214000007300", name: "SUCTION UNIT ELECTRICAL MOBILE", cat: "GENERAL", subcat: "SUCTIONS" },
  { id: "4218190000600", name: "ANALYZER BLOOD GAS BENCHTOP", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190000100", name: "ANALYZER BLOOD GAS POC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4229350003500", name: "ASSIST COUGH", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190001100", name: "DRAINAGE UNIT CHEST", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190002000", name: "EXTRACORPORIAL MEMBRANE OXYGENATION ECMO", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190001000", name: "MANAGEMENT SYSTEM FLUID CEREBRO", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190003400", name: "ANALYZER MARKER CARDIAC AND KIDNEY POC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190003700", name: "ANALYZER HEMOGLOBIN POC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190004200", name: "MONITOR BISPECTRAL BIS", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190005600", name: "MONITOR CEREBRAL OXIMETRY", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190002400", name: "MONITOR ICP", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190005200", name: "MONITOR PHYSIOLOGICAL MRI COMPATIBLE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190005300", name: "MONITOR RESPIRATORY VOLUME NIV", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190004500", name: "MONITORING PAIN", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190005800", name: "PACEMAKER CARDIAC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4219160607300", name: "PENDANT HORIZONTAL", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190006000", name: "PENDANT ICU DOUBLE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190006100", name: "PENDANT VERTICAL SINGLE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190006200", name: "PHOTOTHERAPY DOUBLE PORTABLE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190006300", name: "PHOTOTHERAPY PORTABLE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190007900", name: "MONITOR TELEMETRY SYSTEM", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190001500", name: "THROMBOSIS PREVENTION VIEN DEEP", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190009300", name: "VENTILATOR TRANSPORT MRI COMPATIBLE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190009400", name: "VENTILATOR TRANSPORT WITH MONITOR", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190009800", name: "WOUND CARE NEGATIVE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190009900", name: "WOUND CARE ULTRASONIC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4111560200000", name: "TITRATION UNIT OXYGEN AUTOMATED", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4219180003900", name: "VIBRATOR CHEST UNIT", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4214170400100", name: "MATTRESS AIR BARIATRIC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4227170902000", name: "HIGH FLOW NASAL CANNULA : HFNC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190300100", name: "CARDIAC OUTPUT NON AND MINIMALLY INVASIVE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218305100000", name: "PUPILLOMETER AUTOMATED", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4227150200100", name: "MONITORING PO2/PCO2 NON INVASIVE ICU", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218160000100", name: "MONITOR BLOOD GAS SLEEP DIAGNOSIS TRANSCUTANEOUS", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4223150100000", name: "PUMP FEEDING LARGE VOLUME", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4111583000100", name: "ANALYZER GLUCOSE CRITICAL PATIENT", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4229546500200", name: "SEDATION DELIVERY AND MONITORING UNIT ICU", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4111620000300", name: "LACTATE DEVICE POC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4111620000200", name: "CREATININE DEVICE POC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190004600", name: "MONITOR APNEA", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190004300", name: "MONITOR CAPNOGRAPHY", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4217210100200", name: "DEFIBRILLATOR UNIT ADVANCE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4227220500700", name: "VENTILATOR ICU ADULT AND PEDIATRIC ADVANCE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190019600", name: "MONITOR BEDSIDE ADULT PEDIATRIC ADVANCE 15 INCH", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190019300", name: "MONITOR BEDSIDE ADULT PEDIATRIC ADVANCE 19 INCH", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190012000", name: "MONITOR BEDSIDE ADULT PEDIATRIC BASIC", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
  { id: "4218190019000", name: "MONITOR BEDSIDE ADULT PEDIATRIC MID RANGE", cat: "INTENSIVE CARE", subcat: "GENERAL ICU" },
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
  { id: "4219220700500", name: "STRETCHER CHAIR", cat: "IN-PATIENT", subcat: "IN-PATIENT" },
  { id: "4219180000400", name: "BED ELECTRICAL BARIATRIC", cat: "IN-PATIENT", subcat: "BARIATRIC" },
  { id: "4219180000600", name: "BED INTENSIVE CARE BARIATRIC", cat: "IN-PATIENT", subcat: "BARIATRIC" },
];

export const IHFG: Record<string, IhfgStandard> = {
  "Dental Clinic": {
    minArea: 14, desc: "Dental Surgery Room",
    items: [
      { name: "DENTAL UNIT", subcat: "DENTAL CLINIC", qty: 1, critical: true, code: "DENSR-14", reasoning: "Primary treatment platform mandated by iHFG DENSR-14." },
      { name: "X-RAY PANORAMIC", subcat: "DENTAL CLINIC", qty: 1, critical: true, code: "DENXR", reasoning: "Essential for diagnosis of caries, periodontal disease and pre-surgical assessment." },
      { name: "LIGHT CURING", subcat: "DENTAL CLINIC", qty: 1, critical: true, code: "DENSR-14", reasoning: "Mandatory for composite resin restorations per iHFG DENSR-14." },
      { name: "SCALER ULTRASONIC", subcat: "DENTAL CLINIC", qty: 1, critical: false, code: "DENSR-14", reasoning: "Evidence-based standard for supragingival and subgingival debridement." },
      { name: "CAMERA INTRAORAL", subcat: "DENTAL CLINIC", qty: 1, critical: false, code: "DENSR-14", reasoning: "iHFG-recommended for diagnostic accuracy and medicolegal documentation." },
      { name: "AUTOCLAVE", subcat: "DENTAL CLINIC", qty: 1, critical: true, code: "SRLZ", reasoning: "In-room sterilization is a hard iHFG requirement." },
    ],
  },
  "Operating Room": {
    minArea: 36, desc: "Operating Theatre",
    items: [
      { name: "TABLE OPERATING", subcat: "SURGERY", qty: 1, critical: true, code: "OTH-GEN", reasoning: "Mandatory per iHFG OTH-GEN." },
      { name: "LIGHT OPERATING", subcat: "SURGERY", qty: 2, critical: true, code: "OTH-GEN", reasoning: "iHFG requires minimum two ceiling-mounted lights for shadowless illumination." },
      { name: "ANESTHESIA MACHINE", subcat: "ANESTHESIA", qty: 1, critical: true, code: "OTH-GEN", reasoning: "Most critical life-support equipment in the OR." },
      { name: "MONITOR PATIENT", subcat: "SURGERY", qty: 1, critical: true, code: "OTH-GEN", reasoning: "Continuous intraoperative monitoring is an absolute WHO and iHFG safety requirement." },
      { name: "DEFIBRILLATOR", subcat: "SURGERY", qty: 1, critical: true, code: "OTH-GEN", reasoning: "Perioperative cardiac arrest can occur in any OR." },
      { name: "DIATHERMY", subcat: "SURGERY", qty: 1, critical: false, code: "OTH-GEN", reasoning: "Electrosurgery for haemostasis and cutting." },
      { name: "LAPAROSCOPY", subcat: "SURGERY", qty: 1, critical: false, code: "OTH-GEN", reasoning: "Minimally invasive surgery capability." },
    ],
  },
  "ICU": {
    minArea: 20, desc: "Intensive Care Unit",
    items: [
      { name: "BED ICU", subcat: "GENERAL ICU", qty: 1, critical: true, code: "ICU-SINGLE", reasoning: "Foundation of any ICU bay per iHFG." },
      { name: "VENTILATOR", subcat: "GENERAL ICU", qty: 1, critical: true, code: "ICU-SINGLE", reasoning: "Defines ICU capability per iHFG." },
      { name: "MONITOR PATIENT", subcat: "GENERAL ICU", qty: 2, critical: true, code: "ICU-SINGLE", reasoning: "Two monitors per bay per iHFG." },
      { name: "PUMP INFUSION", subcat: "GENERAL ICU", qty: 3, critical: true, code: "ICU-SINGLE", reasoning: "Minimum three pumps per bay per iHFG." },
      { name: "DEFIBRILLATOR", subcat: "GENERAL ICU", qty: 1, critical: true, code: "ICU-SINGLE", reasoning: "ICU patients have elevated arrhythmia risk." },
      { name: "MONITOR CENTRAL", subcat: "GENERAL ICU", qty: 1, critical: false, code: "ICU-CENTRAL", reasoning: "iHFG-recommended for ICUs over 4 beds." },
    ],
  },
  "NICU": {
    minArea: 10, desc: "Neonatal Intensive Care Unit",
    items: [
      { name: "INCUBATOR NEONATE", subcat: "NICU", qty: 1, critical: true, code: "NICU-BED", reasoning: "Primary thermal management unit per iHFG." },
      { name: "VENTILATOR", subcat: "NICU", qty: 1, critical: true, code: "NICU-VENT", reasoning: "Neonatal ventilation requires specific pressure and flow sensitivity." },
      { name: "MONITOR PATIENT", subcat: "NICU", qty: 1, critical: true, code: "NICU-MON", reasoning: "Continuous neonatal monitoring mandatory per iHFG." },
      { name: "PUMP INFUSION", subcat: "NICU", qty: 2, critical: true, code: "NICU-PUMP", reasoning: "High-precision syringe pumps for neonatal drug dosing." },
      { name: "WARMER RADIANT", subcat: "NICU", qty: 1, critical: false, code: "NICU-WARM", reasoning: "Open radiant warmer for resuscitation and bedside procedures." },
    ],
  },
  "Emergency Room": {
    minArea: 16, desc: "Emergency Treatment Room",
    items: [
      { name: "STRETCHER EMERGENCY", subcat: "IN-PATIENT", qty: 1, critical: true, code: "EM-TREAT", reasoning: "Primary patient platform per iHFG." },
      { name: "MONITOR PATIENT", subcat: "GENERAL ICU", qty: 1, critical: true, code: "EM-TREAT", reasoning: "Continuous monitoring from arrival is core iHFG requirement." },
      { name: "DEFIBRILLATOR", subcat: "GENERAL ICU", qty: 1, critical: true, code: "EM-TREAT", reasoning: "Every minute delay in defibrillation reduces survival 7-10%." },
      { name: "PUMP INFUSION", subcat: "GENERAL ICU", qty: 2, critical: false, code: "EM-TREAT", reasoning: "Two pumps support concurrent vasopressors and antibiotics." },
      { name: "CART CRASH", subcat: "CARTS & CABINETS", qty: 1, critical: false, code: "EM-TREAT", reasoning: "Standardised ACLS drug and airway cart for immediate resuscitation." },
    ],
  },
  "Outpatient Ward": {
    minArea: 12, desc: "Outpatient Consultation Room",
    items: [
      { name: "TABLE EXAM GENERAL", subcat: "GENERAL ITEM CLINIC", qty: 1, critical: true, code: "OPD-GEN", reasoning: "Fundamental requirement per iHFG OPD-GEN." },
      { name: "MONITOR PATIENT", subcat: "GENERAL ICU", qty: 1, critical: true, code: "OPD-GEN", reasoning: "Baseline vital signs at every encounter per iHFG." },
      { name: "DIAGNOSTIC SET HANDHELD", subcat: "GENERAL ITEM CLINIC", qty: 1, critical: false, code: "OPD-GEN", reasoning: "Diagnostic set for otoscopic and ophthalmic examination." },
      { name: "PUMP INFUSION", subcat: "GENERAL ICU", qty: 1, critical: false, code: "OPD-GEN", reasoning: "Supports day-case IV therapy." },
    ],
  },
  "Radiology Suite": {
    minArea: 25, desc: "Radiology Room",
    items: [
      { name: "X-RAY DIGITAL", subcat: "DIGITAL X-RAY", qty: 1, critical: true, code: "RAD-GEN", reasoning: "Mandatory primary imaging modality per iHFG RAD-GEN." },
      { name: "ULTRASOUND GENERAL", subcat: "ULTRASOUND", qty: 1, critical: false, code: "RAD-GEN", reasoning: "Radiation-free complementary imaging." },
      { name: "MONITOR PATIENT", subcat: "GENERAL ICU", qty: 1, critical: false, code: "RAD-GEN", reasoning: "Enables safe imaging of hemodynamically unstable patients." },
    ],
  },
};

export const POSITIONS: Record<string, PositionDef[]> = {
  "Dental Clinic": [
    { x: 190, y: 130, w: 170, h: 110 }, { x: 25, y: 65, w: 100, h: 75 },
    { x: 375, y: 145, w: 80, h: 60 }, { x: 455, y: 275, w: 95, h: 70 },
    { x: 190, y: 268, w: 90, h: 65 }, { x: 95, y: 268, w: 85, h: 65 },
  ],
  "Operating Room": [
    { x: 195, y: 120, w: 185, h: 115 }, { x: 385, y: 55, w: 85, h: 68 },
    { x: 478, y: 55, w: 85, h: 68 }, { x: 22, y: 120, w: 120, h: 95 },
    { x: 385, y: 148, w: 95, h: 78 }, { x: 385, y: 235, w: 95, h: 68 },
    { x: 478, y: 218, w: 85, h: 68 },
  ],
  "ICU": [
    { x: 150, y: 110, w: 215, h: 135 }, { x: 22, y: 110, w: 115, h: 95 },
    { x: 373, y: 90, w: 95, h: 78 }, { x: 373, y: 178, w: 95, h: 78 },
    { x: 476, y: 90, w: 82, h: 60 }, { x: 150, y: 286, w: 150, h: 65 },
  ],
  "NICU": [
    { x: 160, y: 120, w: 200, h: 125 }, { x: 22, y: 110, w: 115, h: 90 },
    { x: 375, y: 100, w: 100, h: 78 }, { x: 375, y: 190, w: 100, h: 70 },
    { x: 22, y: 265, w: 120, h: 75 },
  ],
  "Emergency Room": [
    { x: 170, y: 120, w: 215, h: 115 }, { x: 393, y: 110, w: 105, h: 82 },
    { x: 22, y: 110, w: 115, h: 88 }, { x: 393, y: 203, w: 88, h: 65 },
    { x: 490, y: 203, w: 88, h: 65 },
  ],
  "Outpatient Ward": [
    { x: 180, y: 130, w: 195, h: 115 }, { x: 385, y: 140, w: 100, h: 80 },
    { x: 22, y: 42, w: 140, h: 85 }, { x: 385, y: 232, w: 88, h: 65 },
  ],
  "Radiology Suite": [
    { x: 150, y: 90, w: 260, h: 150 }, { x: 22, y: 90, w: 105, h: 82 },
    { x: 418, y: 265, w: 142, h: 82 },
  ],
};

export function matchItem(reqName: string, reqSubcat?: string): RegistryItem | null {
  const words = reqName.toUpperCase().split(/\s+/).filter((w) => w.length > 2);

  function score(item: RegistryItem): number {
    const n = item.name;
    const nw = n.split(" ");
    let sc = 0;
    words.forEach((w) => {
      if (nw.includes(w)) sc += 10;
      else if (n.includes(w)) sc += 5;
      else if (nw.some((nword) => nword.startsWith(w) || w.startsWith(nword))) sc += 3;
    });
    return sc;
  }

  if (reqSubcat) {
    const pool = REGISTRY.filter((r) => r.subcat === reqSubcat);
    let best: RegistryItem | null = null, bestSc = 0;
    for (const item of pool) {
      const sc = score(item);
      if (sc > bestSc) { bestSc = sc; best = item; }
    }
    if (best && bestSc >= 3) return best;
  }

  let best: RegistryItem | null = null, bestSc = 0;
  for (const item of REGISTRY) {
    const sc = score(item);
    if (sc > bestSc) { bestSc = sc; best = item; }
  }
  return bestSc > 0 ? best : null;
}
