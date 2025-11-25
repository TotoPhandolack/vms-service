/* eslint-disable @next/next/no-img-element */
'use client';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { classNames } from 'primereact/utils';
import { Steps } from 'primereact/steps';
import React, { useRef, useEffect } from 'react';

interface AddCarStepProps {
    carData: any;
    onInputChange: (field: string, value: any) => void;
    submitted: boolean;
    activeIndex: number;
    onStepChange: (index: number) => void;
}

const AddCarStep: React.FC<AddCarStepProps> = ({
    carData,
    onInputChange,
    submitted,
    activeIndex,
    onStepChange
}) => {
    const fileUploadRef = useRef<FileUpload>(null);

    const items = [
        {
            label: 'ຂໍ້ມູນລົດ'
        },
        {
            label: 'ຂໍ້ມູນເຄື່ອງຈັກ'
        },
        {
            label: 'ຂໍ້ມູນເອກະສານ'
        },
        {
            label: 'ກວດສອບ'
        }
    ];

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


    const onImageSelect = (e: any) => {
        if (e.files && e.files[0]) {
            onInputChange('image', e.files[0]);
        }
    };

    // Step 1: ຂໍ້ມູນລົດພື້ນຖານ
    const renderStep1 = () => (
        <div className="grid">
            {/* ດ້ານຊ້າຍ: ອັບໂຫຼດຮູບພາບ */}
            <div className="col-12 md:col-6">
                <div className="flex flex-column align-items-center">
                    <div
                        className="mb-3 flex align-items-center justify-content-center"
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            height: '400px',
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

            {/* ດ້ານຂວາ: ຟອມກວນຂໍ້ມູນ */}
            <div className="col-12 md:col-6">
                <div className="grid">

                    {/* ປ້າຍທະບຽນລົດ */}
                    <div className="col-12">
                        <label htmlFor="plateNumber" className="font-bold">
                            ປ້າຍທະບຽນລົດ
                        </label>
                        <InputText
                            id="plateNumber"
                            value={carData.plateNumber || ''}
                            onChange={(e) => onInputChange('plateNumber', e.target.value)}
                            className={classNames('w-full', {
                                'p-invalid': submitted && !carData.plateNumber
                            })}
                        />
                    </div>

                    {/* ແຂວງລົດ */}
                    <div className="col-12">
                        <label htmlFor="province" className="font-bold">
                            ແຂວງລົດ
                        </label>
                        <Dropdown
                            id="province"
                            value={carData.province}
                            options={brandOptions}
                            onChange={(e) => onInputChange('province', e.value)}
                            placeholder="ກະລຸນາເລືອກ"
                            className={classNames('w-full', {
                                'p-invalid': submitted && !carData.province
                            })}
                            appendTo="self"
                            editable={false}
                        />
                    </div>

                    {/* ປະເພດທະບຽນລົດ */}
                    <div className="col-12">
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
                            appendTo="self"
                            editable={false}
                        />
                    </div>

                    {/* ປະເພດລົດ */}
                    <div className="col-12">
                        <label htmlFor="vehicleType" className="font-bold">
                            ປະເພດລົດ
                        </label>
                        <InputText
                            id="vehicleType"
                            value={carData.vehicleType || ''}
                            onChange={(e) => onInputChange('vehicleType', e.target.value)}
                            placeholder="ປະເພດລົດ"
                            className={classNames('w-full', {
                                'p-invalid': submitted && !carData.vehicleType
                            })}
                        />
                    </div>

                    {/* ສີລົດ */}
                    <div className="col-12">
                        <label htmlFor="color" className="font-bold">
                            ສີລົດ
                        </label>
                        <Dropdown
                            id="color"
                            value={carData.color}
                            options={colorOptions}
                            onChange={(e) => onInputChange('color', e.value)}
                            placeholder="ກະລຸນາເລືອກ"
                            className={classNames('w-full', {
                                'p-invalid': submitted && !carData.color
                            })}
                            appendTo="self"
                            editable={false}
                        />
                    </div>

                    {/* ຍີ່ຫໍ້ລົດ */}
                    <div className="col-12 md:col-6">
                        <label htmlFor="brand" className="font-bold">
                            ຍີ່ຫໍ້ລົດ
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
                            appendTo="self"
                            editable={false}
                        />
                    </div>

                    {/* ລູ້ນລົດ */}
                    <div className="col-12 md:col-6">
                        <label htmlFor="carModel" className="font-bold">
                            ລູ້ນລົດ
                        </label>
                        <InputText
                            id="carModel"
                            value={carData.carModel || ''}
                            onChange={(e) => onInputChange('carModel', e.target.value)}
                            placeholder="ລູ້ນລົດ"
                            className={classNames('w-full', {
                                'p-invalid': submitted && !carData.carModel
                            })}
                        />
                    </div>

                </div>
            </div>
        </div>
    );

    // Step 2: ຂໍ້ມູນເຄື່ອງຈັກ
    const renderStep2 = () => (
        <div className="grid">
            {/* ເລກຈັກ */}
            <div className="col-12 md:col-6">
                <label htmlFor="engineNumber" className="font-bold">
                    ເລກຈັກ
                </label>
                <InputText
                    id="engineNumber"
                    value={carData.engineNumber || ''}
                    onChange={(e) => onInputChange('engineNumber', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.engineNumber
                    })}
                />
            </div>

            {/* ເລກຖັງ */}
            <div className="col-12 md:col-6">
                <label htmlFor="chassisNumber" className="font-bold">
                    ເລກຖັງ
                </label>
                <InputText
                    id="chassisNumber"
                    value={carData.chassisNumber || ''}
                    onChange={(e) => onInputChange('chassisNumber', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.chassisNumber
                    })}
                />
            </div>

            {/* ແຮງຈັກ */}
            <div className="col-12 md:col-6">
                <label htmlFor="horsePower" className="font-bold">
                    ແຮງຈັກ
                </label>
                <InputText
                    id="horsePower"
                    value={carData.horsePower || ''}
                    onChange={(e) => onInputChange('horsePower', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.horsePower
                    })}
                />
            </div>

            {/* ປີພະລິດ */}
            <div className="col-12 md:col-6">
                <label htmlFor="manufactureYear" className="font-bold">
                    ປີພະລິດ
                </label>
                <Dropdown
                    id="manufactureYear"
                    value={carData.manufactureYear}
                    options={yearOptions}
                    onChange={(e) => onInputChange('manufactureYear', e.value)}
                    placeholder="ກະລຸນາເລືອກ"
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.manufactureYear
                    })}
                    appendTo="self"
                    editable={false}
                />
            </div>

            {/* ປະເພດເຊົ່າລົດ */}
            <div className="col-12 md:col-6">
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
                    appendTo="self"
                    editable={false}
                />
            </div>

            {/* ປີນຳໃຊ້ລົດ */}
            <div className="col-12 md:col-6">
                <label htmlFor="usageYear" className="font-bold">
                    ປີນຳໃຊ້ລົດ
                </label>
                <InputText
                    id="usageYear"
                    value={carData.usageYear || ''}
                    onChange={(e) => onInputChange('usageYear', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.usageYear
                    })}
                />
            </div>

            {/* ພາກສ່ວນນຳໃຊ້ລົດ (ຝ່າຍ) */}
            <div className="col-12 md:col-6">
                <label htmlFor="departmentDivision" className="font-bold">
                    ພາກສ່ວນນຳໃຊ້ລົດ (ຝ່າຍ)
                </label>
                <Dropdown
                    id="departmentDivision"
                    value={carData.departmentDivision}
                    options={departmentOptions}
                    onChange={(e) => onInputChange('departmentDivision', e.value)}
                    placeholder="ກະລຸນາເລືອກ"
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.departmentDivision
                    })}
                    appendTo="self"
                    editable={false}
                />
            </div>

            {/* ພາກສ່ວນນຳໃຊ້ລົດ (ພະແນກ/ສາຂາ) */}
            <div className="col-12 md:col-6">
                <label htmlFor="departmentBranch" className="font-bold">
                    ພາກສ່ວນນຳໃຊ້ລົດ (ພະແນກ/ສາຂາ)
                </label>
                <Dropdown
                    id="departmentBranch"
                    value={carData.departmentBranch}
                    options={departmentOptions}
                    onChange={(e) => onInputChange('departmentBranch', e.value)}
                    placeholder="ກະລຸນາເລືອກ"
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.departmentBranch
                    })}
                    appendTo="self"
                    editable={false}
                />
            </div>
        </div>
    );

    // Step 3: ຂໍ້ມູນເອກະສານ
    const renderStep3 = () => (
        <div className="grid">
            {/* ມູນຄ່າລົດ */}
            <div className="col-12 md:col-4">
                <label htmlFor="carValue" className="font-bold">
                    ມູນຄ່າລົດ
                </label>
                <InputText
                    id="carValue"
                    value={carData.carValue || ''}
                    onChange={(e) => onInputChange('carValue', e.target.value)}
                    placeholder="ສະກາຮັບກົມ"
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.carValue
                    })}
                />
            </div>

            {/* ມື້ອອກທະບຽນລົດ */}
            <div className="col-12 md:col-4">
                <label htmlFor="registrationDate" className="font-bold">
                    ມື້ອອກທະບຽນລົດ
                </label>
                <InputText
                    id="registrationDate"
                    value={carData.registrationDate || ''}
                    onChange={(e) => onInputChange('registrationDate', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.registrationDate
                    })}
                />
            </div>

            {/* ມື້ໝົດທະບຽນ */}
            <div className="col-12 md:col-4">
                <label htmlFor="registrationExpiry" className="font-bold">
                    ມື້ໝົດທະບຽນ
                </label>
                <InputText
                    id="registrationExpiry"
                    value={carData.registrationExpiry || ''}
                    onChange={(e) => onInputChange('registrationExpiry', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.registrationExpiry
                    })}
                />
            </div>

            {/* ວັນເດືອນປີ ເສຍຄ່າທາງ */}
            <div className="col-12 md:col-4">
                <label htmlFor="roadTaxDate" className="font-bold">
                    ວັນເດືອນປີ ເສຍຄ່າທາງ
                </label>
                <InputText
                    id="roadTaxDate"
                    value={carData.roadTaxDate || ''}
                    onChange={(e) => onInputChange('roadTaxDate', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.roadTaxDate
                    })}
                />
            </div>

            {/* ວັນເດືອນປີ ຊື້ປະກັນໄພ */}
            <div className="col-12 md:col-4">
                <label htmlFor="insurancePurchaseDate" className="font-bold">
                    ວັນເດືອນປີ ຊື້ປະກັນໄພ
                </label>
                <InputText
                    id="insurancePurchaseDate"
                    value={carData.insurancePurchaseDate || ''}
                    onChange={(e) => onInputChange('insurancePurchaseDate', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.insurancePurchaseDate
                    })}
                />
            </div>

            {/* ວັນເດືອນປີ ໝົດປະກັນໄພ */}
            <div className="col-12 md:col-4">
                <label htmlFor="insuranceExpiry" className="font-bold">
                    ວັນເດືອນປີ ໝົດປະກັນໄພ
                </label>
                <InputText
                    id="insuranceExpiry"
                    value={carData.insuranceExpiry || ''}
                    onChange={(e) => onInputChange('insuranceExpiry', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.insuranceExpiry
                    })}
                />
            </div>

            {/* ວັນເດືອນປີ ກວດກາເຕັກນິກ */}
            <div className="col-12 md:col-4">
                <label htmlFor="technicalCheckDate" className="font-bold">
                    ວັນເດືອນປີ ກວດກາເຕັກນິກ
                </label>
                <InputText
                    id="technicalCheckDate"
                    value={carData.technicalCheckDate || ''}
                    onChange={(e) => onInputChange('technicalCheckDate', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.technicalCheckDate
                    })}
                />
            </div>

            {/* ວັນເດືອນປີ ໝົດກວດກາເຕັກນິກ */}
            <div className="col-12 md:col-4">
                <label htmlFor="technicalCheckExpiry" className="font-bold">
                    ວັນເດືອນປີ ໝົດກວດກາເຕັກນິກ
                </label>
                <InputText
                    id="technicalCheckExpiry"
                    value={carData.technicalCheckExpiry || ''}
                    onChange={(e) => onInputChange('technicalCheckExpiry', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.technicalCheckExpiry
                    })}
                />
            </div>

            {/* ເລກກົງເຕີ */}
            <div className="col-12 md:col-4">
                <label htmlFor="odometerNumber" className="font-bold">
                    ເລກກົງເຕີ
                </label>
                <InputText
                    id="odometerNumber"
                    value={carData.odometerNumber || ''}
                    onChange={(e) => onInputChange('odometerNumber', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.odometerNumber
                    })}
                />
            </div>

            {/* ຊື່ເຈົ້າຂອງທະບຽນ */}
            <div className="col-12 md:col-6">
                <label htmlFor="registrationOwner" className="font-bold">
                    ຊື່ເຈົ້າຂອງທະບຽນ
                </label>
                <InputText
                    id="registrationOwner"
                    value={carData.registrationOwner || ''}
                    onChange={(e) => onInputChange('registrationOwner', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.registrationOwner
                    })}
                />
            </div>
        </div>
    );

    // Step 4: ກວດສອບຂໍ້ມູນ
    const renderStep4 = () => (
        <div className="grid">
            <div className="col-12">
                <h5>ກະລຸນາກວດສອບຂໍ້ມູນກ່ອນບັນທຶກ</h5>
            </div>

            {carData.image && (
                <div className="col-12 md:col-4">
                    <div className="flex flex-column">
                        <span className="font-bold mb-2">ຮູບພາບລົດ:</span>
                        <img
                            src={URL.createObjectURL(carData.image)}
                            alt="Car preview"
                            style={{
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="col-12 md:col-8">
                <div className="grid">
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ປ້າຍທະບຽນລົດ:</span> {carData.plateNumber || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ແຂວງລົດ:</span> {carData.province || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ປະເພດທະບຽນລົດ:</span> {carData.carType || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ປະເພດລົດ:</span> {carData.vehicleType || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ສີລົດ:</span> {carData.color || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ຍີ່ຫໍ້ລົດ:</span> {carData.brand || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ລູ້ນລົດ:</span> {carData.carModel || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ເລກຈັກ:</span> {carData.engineNumber || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ເລກຖັງ:</span> {carData.chassisNumber || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ແຮງຈັກ:</span> {carData.horsePower || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ປີພະລິດ:</span> {carData.manufactureYear || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ປະເພດເຊົ່າລົດ:</span> {carData.category || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ປີນຳໃຊ້ລົດ:</span> {carData.usageYear || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ພາກສ່ວນນຳໃຊ້ລົດ (ຝ່າຍ):</span> {carData.departmentDivision || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ພາກສ່ວນນຳໃຊ້ລົດ (ພະແນກ/ສາຂາ):</span> {carData.departmentBranch || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ມູນຄ່າລົດ:</span> {carData.carValue || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ມື້ອອກທະບຽນລົດ:</span> {carData.registrationDate || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ມື້ໝົດທະບຽນ:</span> {carData.registrationExpiry || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ວັນເດືອນປີ ເສຍຄ່າທາງ:</span> {carData.roadTaxDate || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ວັນເດືອນປີ ຊື້ປະກັນໄພ:</span> {carData.insurancePurchaseDate || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ວັນເດືອນປີ ໝົດປະກັນໄພ:</span> {carData.insuranceExpiry || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ວັນເດືອນປີ ກວດກາເຕັກນິກ:</span> {carData.technicalCheckDate || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ວັນເດືອນປີ ໝົດກວດກາເຕັກນິກ:</span> {carData.technicalCheckExpiry || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ເລກກົງເຕີ:</span> {carData.odometerNumber || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ຊື່ເຈົ້າຂອງທະບຽນ:</span> {carData.registrationOwner || '-'}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Steps
                model={items}
                activeIndex={activeIndex}
                onSelect={(e) => onStepChange(e.index)}
                readOnly={false}
                className="mb-4"
            />

            <div className="mt-4">
                {activeIndex === 0 && renderStep1()}
                {activeIndex === 1 && renderStep2()}
                {activeIndex === 2 && renderStep3()}
                {activeIndex === 3 && renderStep4()}
            </div>
        </div>
    );
};

export default AddCarStep;
