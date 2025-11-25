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
                            appendTo="self"
                            editable={false}
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
                    appendTo="self"
                    editable={false}
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
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.color
                    })}
                    appendTo="self"
                    editable={false}
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
                    appendTo="self"
                    editable={false}
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
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.color
                    })}
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
                    appendTo="self"
                    editable={false}
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
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.color
                    })}
                />
            </div>
        </div>
    );

    // Step 2: ຂໍ້ມູນເອກະສານ
    const renderStep2 = () => (
        <div className="grid">
            {/* Row 1 */}
            <div className="col-12 md:col-4">
                <label htmlFor="registrationNumber" className="font-bold">
                    ແຮງຈັກ
                </label>
                <InputText
                    id="registrationNumber"
                    value={carData.registrationNumber}
                    onChange={(e) => onInputChange('registrationNumber', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })} />
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
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                    appendTo="self"
                    editable={false}
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
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            {/* Row 2 */}
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
                    appendTo="self"
                    editable={false}
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
                    appendTo="self"
                    editable={false}
                />
            </div>

            <div className="col-12 md:col-4">
                <label htmlFor="rentalType2" className="font-bold">
                    ພາກສ່ວນນຳໃຊ້ລົດ (ພະແນກ/ສາຂາ)
                </label>
                <Dropdown
                    id="rentalType2"
                    value={carData.department}
                    options={departmentOptions}
                    onChange={(e) => onInputChange('department', e.value)}
                    placeholder="ກະລຸນາເລືອກ"
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.department
                    })}
                    appendTo="self"
                    editable={false}
                />
            </div>

            {/* Row 3 */}
            <div className="col-12 md:col-4">
                <label className="font-bold">
                    ມູນຄ່າລົດ
                </label>
                <InputText
                    value={carData.deposit}
                    onChange={(e) => onInputChange('deposit', e.target.value)}
                    placeholder="ສະກາຮັບກົມ"
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            <div className="col-12 md:col-4">
                <label className="font-bold">
                    ມື້ອອກທະບຽນລົດ
                </label>
                <InputText
                    value={carData.rentalPricePerDay}
                    onChange={(e) => onInputChange('rentalPricePerDay', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            <div className="col-12 md:col-4">
                <label className="font-bold">
                    ມື້ໝົດທະບຽນລົດ
                </label>
                <InputText
                    value={carData.rentalPricePerMonth}
                    onChange={(e) => onInputChange('rentalPricePerMonth', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            {/* Row 4 */}
            <div className="col-12 md:col-4">
                <label className="font-bold">
                    ວັນ/ເດືອນ/ປີ ເສຍຄ່າທາງ
                </label>
                <InputText
                    value={carData.registrationFee}
                    onChange={(e) => onInputChange('registrationFee', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            <div className="col-12 md:col-4">
                <label className="font-bold">
                    ວັນ/ເດືອນ/ປີ ຊື້ປະກັນໄພ
                </label>
                <InputText
                    value={carData.insuranceFee}
                    onChange={(e) => onInputChange('insuranceFee', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            <div className="col-12 md:col-4">
                <label className="font-bold">
                    ວັນ/ເດືອນ/ປີ ໝົດປະກັນໄພ
                </label>
                <InputText
                    value={carData.roadTaxFee}
                    onChange={(e) => onInputChange('roadTaxFee', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            {/* Row 5 */}
            <div className="col-12 md:col-4">
                <label className="font-bold">
                    ວັນ/ເດືອນ/ປີ ກວດກາເຕັກນິກ
                </label>
                <InputText
                    value={carData.roadTaxFee}
                    onChange={(e) => onInputChange('roadTaxFee', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            <div className="col-12 md:col-4">
                <label className="font-bold">
                    ວັນ/ເດືອນ/ປີ ໝົດກວດກາເຕັກນິກ
                </label>
                <InputText
                    value={carData.roadTaxFee}
                    onChange={(e) => onInputChange('roadTaxFee', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            <div className="col-12 md:col-4">
                <label className="font-bold">
                    ເລກກົງເຕີລົດ
                </label>
                <InputText
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>

            {/* Row 6 */}
            <div className="col-12 md:col-6">
                <label className="font-bold">
                    ຊື່ເຈົ້າຂອງທະບຽນ
                </label>
                <InputText
                    value={carData.staff}
                    onChange={(e) => onInputChange('staff', e.target.value)}
                    className={classNames('w-full', {
                        'p-invalid': submitted && !carData.category
                    })}
                />
            </div>
        </div>
    );

    // Step 3: ກວດສອບຂໍ້ມູນ
    const renderStep3 = () => (
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
                        <span className="font-bold">ແຂວງລົດ:</span> {carData.brand || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ປະເພດທະບຽນລົດ:</span> {carData.carType || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ຍີ່ຫໍລົດ:</span> {carData.carModel || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ສີລົດ:</span> {carData.color || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ປີພະລິດ:</span> {carData.year || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ເລກຈັກ:</span> {carData.engine || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ປະເພດເຊົ່າລົດ:</span> {carData.category || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ພາກສ່ວນນຳໃຊ້ລົດ:</span> {carData.department || '-'}
                    </div>
                    <div className="col-12 md:col-6">
                        <span className="font-bold">ຊື່ເຈົ້າຂອງທະບຽນ:</span> {carData.staff || '-'}
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
            </div>
        </div>
    );
};

export default AddCarStep;
