'use client';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { FaCar } from 'react-icons/fa';
import { IoMdSpeedometer } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';



interface AddcarProps {

}

const AddCarPage: React.FC<AddcarProps> = ({
}) => {
    const toast = useRef<Toast>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [plateType, setPlateType] = useState<string>('');
    const [carPlateType, setCarPlateType] = useState<string>('')
    const [provinceCar, setProvinceCar] = useState<string>('')
    const [carType, setCarType] = useState<string>('')
    const [carColor, setCarColor] = useState<string>('')
    const [carBrand, setCarBrand] = useState<string>('')
    const [carGen, setCarGen] = useState<string>('')
    const [submitted, setSubmitted] = useState(false);
    const [isTab1Completed, setIsTab1Completed] = useState(false);
    const [isTab2Completed, setIsTab2Completed] = useState(false);
    const [isTab3Completed, setIsTab3Completed] = useState(false);
    const [isTab4Completed, setIsTab4Completed] = useState(false);
    const [isTab5Completed, setIsTab5Completed] = useState(false);


    const provincesCar = [
        { label: 'ນະຄອນຫຼວງວຽງຈັນ', value: 'vientiane_capital' },
        { label: 'ຜົ້ງສາລີ', value: 'phongsaly' },
        { label: 'ຫຼວງນ້ຳທາ', value: 'luang_namtha' },
        { label: 'ອຸດົມໄຊ', value: 'oudomxay' },
        { label: 'ບໍ່ແກ້ວ', value: 'bokeo' },
        { label: 'ຫຼວງພະບາງ', value: 'luang_prabang' },
        { label: 'ຫົວພັນ', value: 'huaphanh' },
        { label: 'ໄຊຍະບູລີ', value: 'xayabury' },
        { label: 'ຊຽງຂວາງ', value: 'xiangkhouang' },
        { label: 'ວຽງຈັນ', value: 'vientiane' },
        { label: 'ບໍລິຄຳໄຊ', value: 'bolikhamxay' },
        { label: 'ຄຳມ່ວນ', value: 'khammouane' },
        { label: 'ສະຫວັນນະເຂດ', value: 'savannakhet' },
        { label: 'ສາລະວັນ', value: 'salavan' },
        { label: 'ເຊກອງ', value: 'sekong' },
        { label: 'ຈຳປາສັກ', value: 'champasak' },
        { label: 'ອັດຕະປື', value: 'attapeu' },
        { label: 'ໄຊສົມບູນ', value: 'xaisomboun' },
    ];

    const carPlateTypes = [
        { label: 'ປ້າຍຂາວ', value: 'white_carPlateType' },
        { label: 'ປ້າຍເຫຼືອງ', value: 'yellow_carPlateType' },
        { label: 'ປ້າຍຟ້າ', value: 'blue_carPlateType' },
    ]

    const carTypes = [
        { label: 'ລົດເກັງ', value: 'sedan' },
        { label: 'ລົດກະບະ', value: 'pickup' },
        { label: 'ລົດ SUV', value: 'suv' },
        { label: 'ລົດຕູ້', value: 'van' },
        { label: 'ລົດບັນທຸກ', value: 'truck' },
        { label: 'ລົດໂດຍສານ', value: 'bus' },
    ]

    const carBrands = [
        { label: 'Toyota', value: 'toyota' },
        { label: 'Honda', value: 'honda' },
        { label: 'Nissan', value: 'nissan' },
        { label: 'Mazda', value: 'mazda' },
        { label: 'Mitsubishi', value: 'mitsubishi' },
        { label: 'Isuzu', value: 'isuzu' },
        { label: 'Suzuki', value: 'suzuki' },
        { label: 'Subaru', value: 'subaru' },
        { label: 'Lexus', value: 'lexus' },
        { label: 'Mercedes-Benz', value: 'mercedes_benz' },
        { label: 'BMW', value: 'bmw' },
        { label: 'Audi', value: 'audi' },
        { label: 'Volkswagen', value: 'volkswagen' },
        { label: 'Porsche', value: 'porsche' },
        { label: 'Ford', value: 'ford' },
        { label: 'Chevrolet', value: 'chevrolet' },
        { label: 'GMC', value: 'gmc' },
        { label: 'Jeep', value: 'jeep' },
        { label: 'Dodge', value: 'dodge' },
        { label: 'Chrysler', value: 'chrysler' },
        { label: 'Tesla', value: 'tesla' },
        { label: 'Cadillac', value: 'cadillac' },
        { label: 'Lincoln', value: 'lincoln' },
        { label: 'Hyundai', value: 'hyundai' },
        { label: 'Kia', value: 'kia' },
        { label: 'Genesis', value: 'genesis' },
        { label: 'Volvo', value: 'volvo' },
        { label: 'Land Rover', value: 'land_rover' },
        { label: 'Jaguar', value: 'jaguar' },
        { label: 'Mini', value: 'mini' },
        { label: 'Bentley', value: 'bentley' },
        { label: 'Rolls-Royce', value: 'rolls_royce' },
        { label: 'Ferrari', value: 'ferrari' },
        { label: 'Lamborghini', value: 'lamborghini' },
        { label: 'Maserati', value: 'maserati' },
        { label: 'Alfa Romeo', value: 'alfa_romeo' },
        { label: 'Fiat', value: 'fiat' },
        { label: 'Peugeot', value: 'peugeot' },
        { label: 'Renault', value: 'renault' },
        { label: 'Citroën', value: 'citroen' },
        { label: 'Škoda', value: 'skoda' },
        { label: 'Seat', value: 'seat' },
        { label: 'BYD', value: 'byd' },
        { label: 'Geely', value: 'geely' },
        { label: 'Great Wall', value: 'great_wall' },
        { label: 'Haval', value: 'haval' },
        { label: 'Changan', value: 'changan' },
        { label: 'MG', value: 'mg' },
        { label: 'Chery', value: 'chery' },
        { label: 'GAC', value: 'gac' },
        { label: 'Hongqi', value: 'hongqi' },
        { label: 'Buick', value: 'buick' },
        { label: 'Infiniti', value: 'infiniti' },
        { label: 'Acura', value: 'acura' },
        { label: 'RAM', value: 'ram' },
        { label: 'Hummer', value: 'hummer' },
        { label: 'Saab', value: 'saab' },
        { label: 'Opel', value: 'opel' },
        { label: 'Vauxhall', value: 'vauxhall' },
        { label: 'Dacia', value: 'dacia' },
        { label: 'Lada', value: 'lada' },
        { label: 'Tata', value: 'tata' },
        { label: 'Mahindra', value: 'mahindra' },
        { label: 'Proton', value: 'proton' },
        { label: 'Perodua', value: 'perodua' },
        { label: 'Ssangyong', value: 'ssangyong' },
        { label: 'Aston Martin', value: 'aston_martin' },
        { label: 'McLaren', value: 'mclaren' },
        { label: 'Bugatti', value: 'bugatti' },
        { label: 'Lotus', value: 'lotus' },
        { label: 'Pontiac', value: 'pontiac' },
        { label: 'Saturn', value: 'saturn' },
        { label: 'Mercury', value: 'mercury' },
        { label: 'Oldsmobile', value: 'oldsmobile' },
        { label: 'Plymouth', value: 'plymouth' },
        { label: 'Scion', value: 'scion' },
        { label: 'Smart', value: 'smart' },
        { label: 'Rivian', value: 'rivian' },
        { label: 'Lucid', value: 'lucid' },
        { label: 'Polestar', value: 'polestar' },
        { label: 'NIO', value: 'nio' },
        { label: 'Xpeng', value: 'xpeng' },
        { label: 'Li Auto', value: 'li_auto' },
    ]

    const carGens = [
        { label: '2025', value: '2025' },
        { label: '2024', value: '2024' },
        { label: '2023', value: '2023' },
        { label: '2022', value: '2022' },
        { label: '2021', value: '2021' },
        { label: '2020', value: '2020' },
        { label: '2019', value: '2019' },
        { label: '2018', value: '2018' },
        { label: '2017', value: '2017' },
        { label: '2016', value: '2016' },
        { label: '2015', value: '2015' },
        { label: '2014', value: '2014' },
        { label: '2013', value: '2013' },
        { label: '2012', value: '2012' },
        { label: '2011', value: '2011' },
        { label: '2010', value: '2010' },
        { label: '2009', value: '2009' },
        { label: '2008', value: '2008' },
        { label: '2007', value: '2007' },
        { label: '2006', value: '2006' },
        { label: '2005', value: '2005' },
        { label: '2004', value: '2004' },
        { label: '2003', value: '2003' },
        { label: '2002', value: '2002' },
        { label: '2001', value: '2001' },
        { label: '2000', value: '2000' },
        { label: '1999', value: '1999' },
        { label: '1998', value: '1998' },
        { label: '1997', value: '1997' },
        { label: '1996', value: '1996' },
        { label: '1995', value: '1995' },
        { label: '1994', value: '1994' },
        { label: '1993', value: '1993' },
        { label: '1992', value: '1992' },
        { label: '1991', value: '1991' },
        { label: '1990', value: '1990' },
    ]

    const handleTab1Submit = () => {
        setSubmitted(true);

        if (
            plateType.trim() &&
            carPlateType &&
            carType &&
            provinceCar &&
            carColor.trim() &&
            carBrand &&
            carGen
        ) {
            toast.current?.show({
                severity: 'success',
                summary: 'ສຳເລັດ',
                detail: 'ບັນທຶກຂໍ້ມູນລົດສຳເລັດ',
                life: 3000
            });

            setIsTab1Completed(true);
            setSubmitted(false);
            setActiveIndex(1)
        } else {

            toast.current?.show({
                severity: 'error',
                summary: 'ຜິດພາດ',
                detail: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                life: 3000
            });
        }
    };

    const handleTab2Submit = () => {
        setSubmitted(true);

        if (
            plateType.trim() &&
            carPlateType &&
            carType &&
            provinceCar &&
            carColor.trim() &&
            carBrand &&
            carGen
        ) {
            toast.current?.show({
                severity: 'success',
                summary: 'ສຳເລັດ',
                detail: 'ບັນທຶກຂໍ້ມູນລົດສຳເລັດ',
                life: 3000
            });

            setIsTab2Completed(true);
            setSubmitted(false);
            setActiveIndex(2)
        } else {

            toast.current?.show({
                severity: 'error',
                summary: 'ຜິດພາດ',
                detail: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                life: 3000
            });
        }
    };

    const handleTab3Submit = () => {
        setSubmitted(true);

        if (
            plateType.trim() &&
            carPlateType &&
            carType &&
            provinceCar &&
            carColor.trim() &&
            carBrand &&
            carGen
        ) {
            toast.current?.show({
                severity: 'success',
                summary: 'ສຳເລັດ',
                detail: 'ບັນທຶກຂໍ້ມູນລົດສຳເລັດ',
                life: 3000
            });

            setIsTab3Completed(true);
            setSubmitted(false);
            setActiveIndex(3)
        } else {

            toast.current?.show({
                severity: 'error',
                summary: 'ຜິດພາດ',
                detail: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                life: 3000
            });
        }
    };

    const handleTab4Submit = () => {
        setSubmitted(true);

        if (
            plateType.trim() &&
            carPlateType &&
            carType &&
            provinceCar &&
            carColor.trim() &&
            carBrand &&
            carGen
        ) {
            toast.current?.show({
                severity: 'success',
                summary: 'ສຳເລັດ',
                detail: 'ບັນທຶກຂໍ້ມູນລົດສຳເລັດ',
                life: 3000
            });

            setIsTab4Completed(true);
            setSubmitted(false);
            setActiveIndex(4)
        } else {

            toast.current?.show({
                severity: 'error',
                summary: 'ຜິດພາດ',
                detail: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                life: 3000
            });
        }
    };

    const handleTab5Submit = () => {
        setSubmitted(true);

        if (
            plateType.trim() &&
            carPlateType &&
            carType &&
            provinceCar &&
            carColor.trim() &&
            carBrand &&
            carGen
        ) {
            toast.current?.show({
                severity: 'success',
                summary: 'ສຳເລັດ',
                detail: 'ບັນທຶກຂໍ້ມູນລົດສຳເລັດ',
                life: 3000
            });

            setIsTab5Completed(true);
            setSubmitted(false);
            setActiveIndex(4)
        } else {

            toast.current?.show({
                severity: 'error',
                summary: 'ຜິດພາດ',
                detail: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                life: 3000
            });
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    {/* <h5>ເພີ່ມຂໍ້ມູນລົດ</h5> */}

                    <TabView
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                        pt={{
                            nav: {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-around',

                                }
                            }
                        }}
                    >

                        {/* ຂໍ້ມູນລົດ */}
                        <TabPanel
                            header={
                                <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                    className='w-full'
                                >
                                    <FaCar size={15} />
                                    <span>ຂໍ້ມູນລົດ</span>
                                </div>
                            }
                        >
                            <div className="p-fluid">
                                <div className="grid">

                                    {/* ປ້າຍທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="PlateType" className="font-bold">
                                                ປ້າຍທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="PlateType"
                                                value={plateType}
                                                onChange={(e) => setPlateType(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !plateType.trim()
                                                })}
                                            />
                                            {submitted && !plateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carPlateType" className="font-bold">
                                                ປະເພດທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carPlateType"
                                                value={carPlateType}
                                                options={carPlateTypes}
                                                onChange={(e) => setCarPlateType(e.value)}
                                                placeholder="ປະເພດທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carPlateType
                                                })}
                                            />
                                            {submitted && !carPlateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carType" className="font-bold">
                                                ປະເພດລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carType"
                                                value={carType}
                                                options={carTypes}
                                                onChange={(e) => setCarType(e.value)}
                                                placeholder="ປະເພດລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carType
                                                })}
                                            />
                                            {submitted && !carType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປະເພດລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ແຂວງລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="provincesCar" className="font-bold">
                                                ແຂວງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="provinceCar"
                                                value={provinceCar}
                                                options={provincesCar}
                                                onChange={(e) => setProvinceCar(e.value)}
                                                placeholder="ແຂວງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !provinceCar
                                                })}
                                            />
                                            {submitted && !provinceCar.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ສີຂອງລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carColor" className="font-bold">
                                                ສີຂອງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="carColor"
                                                value={carColor}
                                                onChange={(e) => setCarColor(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນສີຂອງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carColor.trim()
                                                })}
                                            />
                                            {submitted && !carColor.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນສີຂອງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ຍີ່ຫໍ້ລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carBrand" className="font-bold">
                                                ຍີ່ຫໍ້ລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carBrand"
                                                value={carBrand}
                                                options={carBrands}
                                                onChange={(e) => setCarBrand(e.value)}
                                                placeholder="ຍີ່ຫໍ້ລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carBrand
                                                })}
                                            />
                                            {submitted && !carBrand.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຍີ່ຫໍ້ລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ລຸ້ນລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carGen" className="font-bold">
                                                ລຸ້ນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carGen"
                                                value={carGen}
                                                options={carGens}
                                                onChange={(e) => setCarGen(e.value)}
                                                placeholder="ລຸ້ນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carGen
                                                })}
                                            />
                                            {submitted && !carGen.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນລຸ້ນລົດ</small>
                                            )}
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className="flex justify-content-center gap-2 mt-4">
                                <Button
                                    label="ບັນທຶກຂໍ້ມູນ"
                                    icon="pi pi-check"
                                    onClick={handleTab1Submit}
                                    className="w-1 bg-blue-800 border-none"
                                />
                            </div>

                        </TabPanel>

                        {/* ຂໍ້ມູນເຄື່ງຈັກລົດ */}
                        <TabPanel
                            disabled={!isTab1Completed}
                            header={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <IoMdSpeedometer size={15} />
                                    <span>ຂໍ້ມູນເຄື່ງຈັກລົດ</span>
                                </div>
                            }
                        >
                            <div className="p-fluid">
                                <div className="grid">

                                    {/* ປ້າຍທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="PlateType" className="font-bold">
                                                ປ້າຍທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="PlateType"
                                                value={plateType}
                                                onChange={(e) => setPlateType(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !plateType.trim()
                                                })}
                                            />
                                            {submitted && !plateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carPlateType" className="font-bold">
                                                ປະເພດທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carPlateType"
                                                value={carPlateType}
                                                options={carPlateTypes}
                                                onChange={(e) => setCarPlateType(e.value)}
                                                placeholder="ປະເພດທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carPlateType
                                                })}
                                            />
                                            {submitted && !carPlateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carType" className="font-bold">
                                                ປະເພດລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carType"
                                                value={carType}
                                                options={carTypes}
                                                onChange={(e) => setCarType(e.value)}
                                                placeholder="ປະເພດລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carType
                                                })}
                                            />
                                            {submitted && !carType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປະເພດລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ແຂວງລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="provincesCar" className="font-bold">
                                                ແຂວງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="provinceCar"
                                                value={provinceCar}
                                                options={provincesCar}
                                                onChange={(e) => setProvinceCar(e.value)}
                                                placeholder="ແຂວງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !provinceCar
                                                })}
                                            />
                                            {submitted && !provinceCar.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ສີຂອງລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carColor" className="font-bold">
                                                ສີຂອງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="carColor"
                                                value={carColor}
                                                onChange={(e) => setCarColor(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນສີຂອງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carColor.trim()
                                                })}
                                            />
                                            {submitted && !carColor.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນສີຂອງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ຍີ່ຫໍ້ລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carBrand" className="font-bold">
                                                ຍີ່ຫໍ້ລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carBrand"
                                                value={carBrand}
                                                options={carBrands}
                                                onChange={(e) => setCarBrand(e.value)}
                                                placeholder="ຍີ່ຫໍ້ລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carBrand
                                                })}
                                            />
                                            {submitted && !carBrand.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຍີ່ຫໍ້ລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ລຸ້ນລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carGen" className="font-bold">
                                                ລຸ້ນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carGen"
                                                value={carGen}
                                                options={carGens}
                                                onChange={(e) => setCarGen(e.value)}
                                                placeholder="ລຸ້ນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carGen
                                                })}
                                            />
                                            {submitted && !carGen.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນລຸ້ນລົດ</small>
                                            )}
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className="flex justify-content-center gap-2 mt-4">
                                <Button
                                    label="ບັນທຶກຂໍ້ມູນ"
                                    icon="pi pi-check"
                                    onClick={handleTab2Submit}
                                    className="w-1 bg-blue-800 border-none"
                                />
                            </div>

                        </TabPanel>

                        {/* ຂໍ້ມູນເອກະສານລົດ */}
                        <TabPanel
                            disabled={!isTab1Completed || !isTab2Completed}
                            header={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <IoDocumentText size={15} />
                                    <span>ຂໍ້ມູນເອກະສານລົດ</span>
                                </div>
                            }
                        >

                            <div className="p-fluid">
                                <div className="grid">

                                    {/* ປ້າຍທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="PlateType" className="font-bold">
                                                ປ້າຍທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="PlateType"
                                                value={plateType}
                                                onChange={(e) => setPlateType(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !plateType.trim()
                                                })}
                                            />
                                            {submitted && !plateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carPlateType" className="font-bold">
                                                ປະເພດທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carPlateType"
                                                value={carPlateType}
                                                options={carPlateTypes}
                                                onChange={(e) => setCarPlateType(e.value)}
                                                placeholder="ປະເພດທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carPlateType
                                                })}
                                            />
                                            {submitted && !carPlateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carType" className="font-bold">
                                                ປະເພດລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carType"
                                                value={carType}
                                                options={carTypes}
                                                onChange={(e) => setCarType(e.value)}
                                                placeholder="ປະເພດລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carType
                                                })}
                                            />
                                            {submitted && !carType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປະເພດລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ແຂວງລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="provincesCar" className="font-bold">
                                                ແຂວງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="provinceCar"
                                                value={provinceCar}
                                                options={provincesCar}
                                                onChange={(e) => setProvinceCar(e.value)}
                                                placeholder="ແຂວງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !provinceCar
                                                })}
                                            />
                                            {submitted && !provinceCar.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ສີຂອງລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carColor" className="font-bold">
                                                ສີຂອງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="carColor"
                                                value={carColor}
                                                onChange={(e) => setCarColor(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນສີຂອງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carColor.trim()
                                                })}
                                            />
                                            {submitted && !carColor.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນສີຂອງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ຍີ່ຫໍ້ລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carBrand" className="font-bold">
                                                ຍີ່ຫໍ້ລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carBrand"
                                                value={carBrand}
                                                options={carBrands}
                                                onChange={(e) => setCarBrand(e.value)}
                                                placeholder="ຍີ່ຫໍ້ລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carBrand
                                                })}
                                            />
                                            {submitted && !carBrand.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຍີ່ຫໍ້ລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ລຸ້ນລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carGen" className="font-bold">
                                                ລຸ້ນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carGen"
                                                value={carGen}
                                                options={carGens}
                                                onChange={(e) => setCarGen(e.value)}
                                                placeholder="ລຸ້ນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carGen
                                                })}
                                            />
                                            {submitted && !carGen.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນລຸ້ນລົດ</small>
                                            )}
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className="flex justify-content-center gap-2 mt-4">
                                <Button
                                    label="ບັນທຶກຂໍ້ມູນ"
                                    icon="pi pi-check"
                                    onClick={handleTab3Submit}
                                    className="w-1 bg-blue-800 border-none"
                                />
                            </div>

                        </TabPanel>

                        {/* ຂໍ້ມູນເອກະສານຜູ້ນຳໃຊ້ລົດ */}
                        <TabPanel
                            disabled={!isTab1Completed || !isTab2Completed || !isTab3Completed}
                            header={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaAddressCard size={15} />
                                    <span>ຂໍ້ມູນເອກະສານຜູ້ນຳໃຊ້ລົດ</span>
                                </div>
                            }
                        >
                            <div className="p-fluid">
                                <div className="grid">

                                    {/* ປ້າຍທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="PlateType" className="font-bold">
                                                ປ້າຍທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="PlateType"
                                                value={plateType}
                                                onChange={(e) => setPlateType(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !plateType.trim()
                                                })}
                                            />
                                            {submitted && !plateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carPlateType" className="font-bold">
                                                ປະເພດທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carPlateType"
                                                value={carPlateType}
                                                options={carPlateTypes}
                                                onChange={(e) => setCarPlateType(e.value)}
                                                placeholder="ປະເພດທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carPlateType
                                                })}
                                            />
                                            {submitted && !carPlateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carType" className="font-bold">
                                                ປະເພດລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carType"
                                                value={carType}
                                                options={carTypes}
                                                onChange={(e) => setCarType(e.value)}
                                                placeholder="ປະເພດລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carType
                                                })}
                                            />
                                            {submitted && !carType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປະເພດລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ແຂວງລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="provincesCar" className="font-bold">
                                                ແຂວງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="provinceCar"
                                                value={provinceCar}
                                                options={provincesCar}
                                                onChange={(e) => setProvinceCar(e.value)}
                                                placeholder="ແຂວງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !provinceCar
                                                })}
                                            />
                                            {submitted && !provinceCar.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ສີຂອງລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carColor" className="font-bold">
                                                ສີຂອງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="carColor"
                                                value={carColor}
                                                onChange={(e) => setCarColor(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນສີຂອງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carColor.trim()
                                                })}
                                            />
                                            {submitted && !carColor.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນສີຂອງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ຍີ່ຫໍ້ລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carBrand" className="font-bold">
                                                ຍີ່ຫໍ້ລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carBrand"
                                                value={carBrand}
                                                options={carBrands}
                                                onChange={(e) => setCarBrand(e.value)}
                                                placeholder="ຍີ່ຫໍ້ລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carBrand
                                                })}
                                            />
                                            {submitted && !carBrand.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຍີ່ຫໍ້ລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ລຸ້ນລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carGen" className="font-bold">
                                                ລຸ້ນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carGen"
                                                value={carGen}
                                                options={carGens}
                                                onChange={(e) => setCarGen(e.value)}
                                                placeholder="ລຸ້ນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carGen
                                                })}
                                            />
                                            {submitted && !carGen.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນລຸ້ນລົດ</small>
                                            )}
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className="flex justify-content-center gap-2 mt-4">
                                <Button
                                    label="ບັນທຶກຂໍ້ມູນ"
                                    icon="pi pi-check"
                                    onClick={handleTab4Submit}
                                    className="w-1 bg-blue-800 border-none"
                                />
                            </div>
                        </TabPanel>

                        {/* ຮູບພາບລົດ & ເອກະສານລົດPDF */}
                        <TabPanel
                            disabled={!isTab1Completed || !isTab2Completed || !isTab3Completed || !isTab4Completed}
                            header={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaFilePdf size={15} />
                                    <span>ຮູບພາບລົດ & ເອກະສານລົດPDF</span>
                                </div>
                            }
                        >
                            <div className="p-fluid">
                                <div className="grid">

                                    {/* ປ້າຍທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="PlateType" className="font-bold">
                                                ປ້າຍທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="PlateType"
                                                value={plateType}
                                                onChange={(e) => setPlateType(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !plateType.trim()
                                                })}
                                            />
                                            {submitted && !plateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດທະບຽນລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carPlateType" className="font-bold">
                                                ປະເພດທະບຽນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carPlateType"
                                                value={carPlateType}
                                                options={carPlateTypes}
                                                onChange={(e) => setCarPlateType(e.value)}
                                                placeholder="ປະເພດທະບຽນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carPlateType
                                                })}
                                            />
                                            {submitted && !carPlateType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ປະເພດລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="carType" className="font-bold">
                                                ປະເພດລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carType"
                                                value={carType}
                                                options={carTypes}
                                                onChange={(e) => setCarType(e.value)}
                                                placeholder="ປະເພດລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carType
                                                })}
                                            />
                                            {submitted && !carType.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປະເພດລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ແຂວງລົດ */}
                                    <div className="col-12 md:col-6">
                                        <div className="field">
                                            <label htmlFor="provincesCar" className="font-bold">
                                                ແຂວງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="provinceCar"
                                                value={provinceCar}
                                                options={provincesCar}
                                                onChange={(e) => setProvinceCar(e.value)}
                                                placeholder="ແຂວງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !provinceCar
                                                })}
                                            />
                                            {submitted && !provinceCar.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນແຂວງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ສີຂອງລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carColor" className="font-bold">
                                                ສີຂອງລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <InputText
                                                id="carColor"
                                                value={carColor}
                                                onChange={(e) => setCarColor(e.target.value)}
                                                placeholder="ກະລຸນາປ້ອນສີຂອງລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carColor.trim()
                                                })}
                                            />
                                            {submitted && !carColor.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນສີຂອງລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ຍີ່ຫໍ້ລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carBrand" className="font-bold">
                                                ຍີ່ຫໍ້ລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carBrand"
                                                value={carBrand}
                                                options={carBrands}
                                                onChange={(e) => setCarBrand(e.value)}
                                                placeholder="ຍີ່ຫໍ້ລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carBrand
                                                })}
                                            />
                                            {submitted && !carBrand.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຍີ່ຫໍ້ລົດ</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* ລຸ້ນລົດ */}
                                    <div className="col-12 md:col-4">
                                        <div className="field">
                                            <label htmlFor="carGen" className="font-bold">
                                                ລຸ້ນລົດ <span className="text-red-500">*</span>
                                            </label>
                                            <Dropdown
                                                id="carGen"
                                                value={carGen}
                                                options={carGens}
                                                onChange={(e) => setCarGen(e.value)}
                                                placeholder="ລຸ້ນລົດ"
                                                className={classNames({
                                                    'p-invalid': submitted && !carGen
                                                })}
                                            />
                                            {submitted && !carGen.trim() && (
                                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນລຸ້ນລົດ</small>
                                            )}
                                        </div>
                                    </div>



                                </div>
                                <div className="flex justify-content-center gap-2 mt-4">
                                    <Button
                                        label="ບັນທຶກຂໍ້ມູນ"
                                        icon="pi pi-check"
                                        onClick={handleTab4Submit}
                                        className="w-1 bg-blue-800 border-none"
                                    />
                                </div>

                            </div>
                        </TabPanel>

                    </TabView>




                </div>

                <div className="flex justify-content-between mt-4">
                    <Button
                        label="ຍ້ອນກັບ"
                        icon="pi pi-arrow-left"
                        onClick={() => setActiveIndex(activeIndex - 1)}
                        disabled={activeIndex === 0}
                        className="bg-blue-800 border-none"
                    />
                    {activeIndex !== 4 && (
                        <Button
                            label="ຕໍ່ໄປ"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            onClick={() => setActiveIndex(activeIndex + 1)}
                            disabled={
                                (activeIndex === 0 && !isTab1Completed) ||
                                (activeIndex === 1 && !isTab2Completed) ||
                                (activeIndex === 2 && !isTab3Completed) ||
                                (activeIndex === 3 && !isTab4Completed)
                            }
                            className="bg-blue-800 border-none"
                        />
                    )}
                </div>

            </div>
        </div>
    );
};

export default AddCarPage;
