/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const AddCarPage = () => {
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const fileUploadRef = useRef<FileUpload>(null);

    const [submitted, setSubmitted] = useState(false);
    const [carData, setCarData] = useState({
        plateNumber: '',
        brand: '',
        carType: '',
        carModel: '',
        color: '',
        year: '',
        engine: '',
        category: '',
        registrationNumber: '',
        chassisNumber: '',
        weight: '',
        seats: '',
        rentalPricePerDay: '',
        rentalPricePerMonth: '',
        deposit: '',
        registrationFee: '',
        insuranceFee: '',
        roadTaxFee: '',
        department: '',
        staff: '',
        image: null
    });

    // ตัวเลือกสำหรับ Dropdown
    const brandOptions = [
        { label: 'Toyota', value: 'toyota' },
        { label: 'Honda', value: 'honda' },
        { label: 'Nissan', value: 'nissan' },
        { label: 'Mazda', value: 'mazda' },
        { label: 'Mitsubishi', value: 'mitsubishi' }
    ];

    const carTypeOptions = [
        { label: 'ລົດ 4 ລໍ້', value: 'car4' },
        { label: 'ລົດ 6 ລໍ້', value: 'car6' },
        { label: 'ລົດ 10 ລໍ້', value: 'car10' }
    ];

    const colorOptions = [
        { label: 'ຂາວ', value: 'white' },
        { label: 'ດຳ', value: 'black' },
        { label: 'ແດງ', value: 'red' },
        { label: 'ເທົາ', value: 'gray' },
        { label: 'ເງິນ', value: 'silver' }
    ];

    const yearOptions = Array.from({ length: 30 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { label: year.toString(), value: year.toString() };
    });

    const categoryOptions = [
        { label: 'ເຊົ່າລາຍວັນ', value: 'daily' },
        { label: 'ເຊົ່າລາຍເດືອນ', value: 'monthly' },
        { label: 'ເຊົ່າລາຍປີ', value: 'yearly' }
    ];

    const departmentOptions = [
        { label: 'ພະແນກ 1', value: 'dept1' },
        { label: 'ພະແນກ 2', value: 'dept2' },
        { label: 'ພະແນກ 3', value: 'dept3' }
    ];

    const onInputChange = (field: string, value: any) => {
        setCarData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const onImageSelect = (e: any) => {
        if (e.files && e.files[0]) {
            setCarData(prev => ({
                ...prev,
                image: e.files[0]
            }));
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);

        // ตรวจสอบฟิลด์ที่จำเป็น
        if (
            !carData.plateNumber ||
            !carData.brand ||
            !carData.carType ||
            !carData.color ||
            !carData.year ||
            !carData.category ||
            !carData.department
        ) {
            toast.current?.show({
                severity: 'error',
                summary: 'ຜິດພາດ',
                detail: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                life: 3000
            });
            return;
        }

        // TODO: ส่งข้อมูลไปยัง API
        console.log('Car Data:', carData);

        toast.current?.show({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ເພີ່ມຂໍ້ມູນລົດສຳເລັດ',
            life: 3000
        });

        // Redirect กลับไปหน้ารายการ
        setTimeout(() => {
            router.push('/admin/cars');
        }, 2000);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    <h5>ເພີ່ມຂໍ້ມູນລົດ</h5>

                    <div className="grid">
                        {/* ອັບໂຫຼດຮູບພາບ */}
                        <div className="col-12 md:col-6">
                            <div className="flex flex-column align-items-center">
                                <div
                                    className="mb-3 flex align-items-center justify-content-center"
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        borderRadius: '5px',
                                        border: carData.image ? 'none' : '2px dashed #cbd5e0',
                                        backgroundColor: carData.image ? 'transparent' : '#f7fafc',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {carData.image ? (
                                        <img
                                            src={URL.createObjectURL(carData.image)}
                                            alt="Car preview"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <div className="flex flex-column align-items-center justify-content-center text-center p-3">
                                            <i className="pi pi-cloud-upload text-4xl text-400 mb-2"></i>
                                            <span className="text-500 text-sm">ອັບໂຫຼດຮູບພາບລົດ</span>
                                            <span className="text-400 text-xs mt-1">Upload car image</span>
                                        </div>
                                    )}
                                </div>
                                <FileUpload
                                    ref={fileUploadRef}
                                    mode="basic"
                                    name="carImage"
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    onSelect={onImageSelect}
                                    chooseLabel={carData.image ? "ປ່ຽນຮູບພາບ" : "ເລືອກຮູບພາບ"}
                                    className="p-button-outlined"
                                />

                            </div>
                        </div>

                        <div className="col-12 md:col-6">
                            <div className="grid">
                                {/* ປ້າຍທະບຽນລົດ */}
                                <div className="col-12">
                                    <label htmlFor="plateNumber" className="font-bold">
                                        ປ້າຍທະບຽນລົດ
                                    </label>
                                    <InputText
                                        id="plateNumber"
                                        value={carData.plateNumber}
                                        onChange={(e) => onInputChange('plateNumber', e.target.value)}
                                        className={classNames('w-full', {
                                            'p-invalid': submitted && !carData.plateNumber
                                        })}
                                    />
                                </div>

                                {/* ແຂວງລົດ */}
                                <div className="col-12">
                                    <label htmlFor="brand" className="font-bold">
                                        ແຂວງລົດ
                                    </label>
                                    <Dropdown
                                        id="brand"
                                        value={carData.brand}
                                        options={brandOptions}
                                        onChange={(e) => onInputChange('brand', e.value)}
                                        placeholder="ກະລຸນາເລືອກ"
                                        className={classNames('w-full', {
                                            'p-invalid': submitted && !carData.brand
                                        })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="col-12 md:col-4">
                            <label htmlFor="carType" className="font-bold">
                                ປະເພດທະບຽນລົດ
                            </label>
                            <Dropdown
                                id="carType"
                                value={carData.carType}
                                options={carTypeOptions}
                                onChange={(e) => onInputChange('carType', e.value)}
                                placeholder="ກະລຸນາເລືອກ"
                                className={classNames('w-full', {
                                    'p-invalid': submitted && !carData.carType
                                })}
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label htmlFor="carModel" className="font-bold">
                                ຍີ່ຫໍລົດ
                            </label>
                            <Dropdown
                                id="carModel"
                                value={carData.carModel}
                                options={brandOptions}
                                onChange={(e) => onInputChange('carModel', e.value)}
                                placeholder="ກະລຸນາເລືອກ"
                                className="w-full"
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label htmlFor="model" className="font-bold">
                                ປະເພດລົດ
                            </label>
                            <Dropdown
                                id="model"
                                value={carData.color}
                                options={colorOptions}
                                onChange={(e) => onInputChange('color', e.value)}
                                placeholder="ກະລຸນາເລືອກ"
                                className={classNames('w-full', {
                                    'p-invalid': submitted && !carData.color
                                })}
                            />
                        </div>

                        {/* Row 3 */}
                        <div className="col-12 md:col-4">
                            <label htmlFor="color" className="font-bold">
                                ສີລົດ
                            </label>
                            <InputText
                                id="color"
                                value={carData.color}
                                onChange={(e) => onInputChange('color', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label htmlFor="year" className="font-bold">
                                ປີພະລິດ
                            </label>
                            <Dropdown
                                id="year"
                                value={carData.year}
                                options={yearOptions}
                                onChange={(e) => onInputChange('year', e.value)}
                                placeholder="ກະລຸນາເລືອກ"
                                className={classNames('w-full', {
                                    'p-invalid': submitted && !carData.year
                                })}
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label htmlFor="engine" className="font-bold">
                                ເລກຈັກ
                            </label>
                            <InputText
                                id="engine"
                                value={carData.engine}
                                onChange={(e) => onInputChange('engine', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* Row 4 */}
                        <div className="col-12 md:col-4">
                            <label htmlFor="registrationNumber" className="font-bold">
                                ແຮງຈັກ
                            </label>
                            <InputText
                                id="registrationNumber"
                                value={carData.registrationNumber}
                                onChange={(e) => onInputChange('registrationNumber', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label htmlFor="chassisNumber" className="font-bold">
                                ປີພະລິດ
                            </label>
                            <Dropdown
                                id="chassisNumber"
                                value={carData.year}
                                options={yearOptions}
                                onChange={(e) => onInputChange('year', e.value)}
                                placeholder="ກະລຸນາເລືອກ"
                                className="w-full"
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label htmlFor="weight" className="font-bold">
                                ປີນນຳໃຊ້ລົດ
                            </label>
                            <InputText
                                id="weight"
                                value={carData.weight}
                                onChange={(e) => onInputChange('weight', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* Row 5 */}
                        <div className="col-12 md:col-4">
                            <label htmlFor="category" className="font-bold">
                                ປະເພດເຊົ່າລົດ
                            </label>
                            <Dropdown
                                id="category"
                                value={carData.category}
                                options={categoryOptions}
                                onChange={(e) => onInputChange('category', e.value)}
                                placeholder="ກະລຸນາເລືອກ"
                                className={classNames('w-full', {
                                    'p-invalid': submitted && !carData.category
                                })}
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label htmlFor="rentalType" className="font-bold">
                                ພາກສ່ວນນຳໃຊ້ລົດ (ຝ່າຍ)
                            </label>
                            <Dropdown
                                id="rentalType"
                                value={carData.department}
                                options={departmentOptions}
                                onChange={(e) => onInputChange('department', e.value)}
                                placeholder="ກະລຸນາເລືອກ"
                                className={classNames('w-full', {
                                    'p-invalid': submitted && !carData.department
                                })}
                            />
                        </div>
                        <div className="col-12 md:col-4">
                            <label htmlFor="rentalType" className="font-bold">
                                ພາກສ່ວນນຳໃຊ້ລົດ (ພະແນກ/ສາຂາ)
                            </label>
                            <Dropdown
                                id="rentalType"
                                value={carData.department}
                                options={departmentOptions}
                                onChange={(e) => onInputChange('department', e.value)}
                                placeholder="ກະລຸນາເລືອກ"
                                className={classNames('w-full', {
                                    'p-invalid': submitted && !carData.department
                                })}
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label className="font-bold">
                                ມູນຄ່າລົດ
                            </label>
                            <InputText
                                value={carData.deposit}
                                onChange={(e) => onInputChange('deposit', e.target.value)}
                                placeholder="ສະກາຮັບກົມ"
                                className="w-full"
                            />
                        </div>

                        {/* Row 6 - ຄ່າທຳນຽມ */}
                        <div className="col-12 md:col-4">
                            <label className="font-bold">
                                ມື້ອອກທະບຽນລົດ
                            </label>
                            <InputText
                                value={carData.rentalPricePerDay}
                                onChange={(e) => onInputChange('rentalPricePerDay', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label className="font-bold">
                                ມື້ໝົດທະບຽນລົດ
                            </label>
                            <InputText
                                value={carData.rentalPricePerMonth}
                                onChange={(e) => onInputChange('rentalPricePerMonth', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label className="font-bold">
                                ວັນ/ເດືອນ/ປີ ເສຍຄ່າທາງ
                            </label>
                            <InputText
                                value={carData.registrationFee}
                                onChange={(e) => onInputChange('registrationFee', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* Row 7 */}
                        <div className="col-12 md:col-4">
                            <label className="font-bold">
                                ວັນ/ເດືອນ/ປີ ຊື້ປະກັນໄພ
                            </label>
                            <InputText
                                value={carData.insuranceFee}
                                onChange={(e) => onInputChange('insuranceFee', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label className="font-bold">
                                ວັນ/ເດືອນ/ປີ ໝົດປະກັນໄພ
                            </label>
                            <InputText
                                value={carData.roadTaxFee}
                                onChange={(e) => onInputChange('roadTaxFee', e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="col-12 md:col-4">
                            <label className="font-bold">
                                ວັນ/ເດືອນ/ປີ ກວດກາເຕັກນິກ
                            </label>
                            <InputText
                                value={carData.roadTaxFee}
                                onChange={(e) => onInputChange('roadTaxFee', e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="col-12 md:col-4">
                            <label className="font-bold">
                                ວັນ/ເດືອນ/ປີ ໝົດກວດກາເຕັກນິກ
                            </label>
                            <InputText
                                value={carData.roadTaxFee}
                                onChange={(e) => onInputChange('roadTaxFee', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="col-12 md:col-4">
                            <label className="font-bold">
                                ເລກກົງເຕີລົດ
                            </label>
                            <InputText
                                className="w-full"
                            />
                        </div>

                        {/* Row 8 */}
                        <div className="col-12 md:col-6">
                            <label className="font-bold">
                                ຊື່ເຈົ້າຂອງທະບຽນ
                            </label>
                            <InputText
                                value={carData.staff}
                                onChange={(e) => onInputChange('staff', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* ປຸ່ມບັນທຶກ */}
                        <div className="col-12">
                            <Button
                                label="ບັນທຶກ"
                                icon="pi pi-check"
                                className="w-full md:w-auto"
                                onClick={handleSubmit}
                                style={{ backgroundColor: '#007bff', border: 'none', padding: '0.75rem 2rem' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCarPage;