            //window.onload=function() {

                                
            FNonProcObj = document.getElementById('FNonProc');
            FProcObj = document.getElementById('FProc');
            FTotalBudgetObj = document.getElementById('FTotalBudget');
            FOHPortionObj = document.getElementById('FOHPortion');

            BNonProcObj = document.getElementById('BNonProc');
            BProcObj = document.getElementById('BProc');
            BTotalBudgetObj = document.getElementById('BTotalBudget');
            BOHPortionObj = document.getElementById('BOHPortion');
            
            ONonProcObj = document.getElementById('ONonProc');
             OProcObj = document.getElementById('OProc');
            OTotalBudgetObj = document.getElementById('OTotalBudget');
            OOHPortionObj = document.getElementById('OOHPortion');

            SNonProcObj = document.getElementById('SNonProc');
            SProcObj = document.getElementById('SProc');
            STotalBudgetObj = document.getElementById('STotalBudget');
            SOHPortionObj = document.getElementById('SOHPortion');

            MNonProcObj = document.getElementById('MNonProc');
            MProcObj = document.getElementById('MProc');
            MTotalBudgetObj = document.getElementById('MTotalBudget');
            MOHPortionObj = document.getElementById('MOHPortion');

            TNonProcObj = document.getElementById('TNonProc');
            TProcObj = document.getElementById('TProc');
            TTotalBudgetObj = document.getElementById('TTotalBudget');
            TOHPortionObj = document.getElementById('TOHPortion');

            // document.getElementById('btnReset').onclick = resetInputs;
            // document.getElementById('btnCalc').onclick = calcRate;
            // document.getElementById('btnSave').onclick = calcSave;


            BVGAObj = document.getElementById('BVGA');
            BVSPIObj = document.getElementById('BVSPI');
            BVICPObj = document.getElementById('BVICP');
            BVLDRDObj = document.getElementById('BVLDRD');
            BVProcObj = document.getElementById('BVProc');

            PoolGAObj = document.getElementById('PoolGA');
            PoolSPIObj = document.getElementById('PoolSPI');
            PoolICPObj = document.getElementById('PoolICP');
            PoolLDRDObj = document.getElementById('PoolLDRD');
            PoolProcObj = document.getElementById('PoolProc');

            newGAObj = document.getElementById('newGA');
            newSPIObj = document.getElementById('newSPI');
            newICPObj = document.getElementById('newICP');
            newLDRDObj = document.getElementById('newLDRD');
            newProcObj = document.getElementById('newProc');



            BVGAObj.innerHTML = indRowData[0].BVAmt.toLocaleString();
            BVSPIObj.innerHTML = indRowData[1].BVAmt.toLocaleString();
            BVICPObj.innerHTML = indRowData[2].BVAmt.toLocaleString();
            BVLDRDObj.innerHTML = indRowData[3].BVAmt.toLocaleString();
            BVProcObj.innerHTML = indRowData[4].BVAmt.toLocaleString();

           
            newGAObj.innerHTML = indRowData[0].Calculated_Rate.toLocaleString();
            newSPIObj.innerHTML = indRowData[1].Calculated_Rate.toLocaleString();
            newICPObj.innerHTML = indRowData[2].Calculated_Rate.toLocaleString();
            newLDRDObj.innerHTML = indRowData[3].Calculated_Rate.toLocaleString();
            newProcObj.innerHTML = indRowData[4].Calculated_Rate.toLocaleString();

            FNonProcObj.value = defaultBV[0].NonProcAmt;
            FProcObj.value = defaultBV[0].ProcAmt;
            FTotalBudgetObj.innerHTML = defaultBV[0].Total.toLocaleString();
            FOHPortionObj.innerHTML = defaultBV[0].OH.toLocaleString();

            BNonProcObj.value = defaultBV[1].NonProcAmt;
            BProcObj.value = defaultBV[1].ProcAmt;
            BTotalBudgetObj.innerHTML = defaultBV[1].Total.toLocaleString();
            BOHPortionObj.innerHTML = defaultBV[1].OH.toLocaleString();
            
            ONonProcObj.value = defaultBV[4].NonProcAmt;
             OProcObj.value = defaultBV[4].ProcAmt;
            OTotalBudgetObj.innerHTML = defaultBV[4].Total.toLocaleString();
            OOHPortionObj.innerHTML = defaultBV[4].OH.toLocaleString();

            SNonProcObj.value = defaultBV[2].NonProcAmt;
            SProcObj.value = defaultBV[2].ProcAmt;
            STotalBudgetObj.innerHTML = defaultBV[2].Total.toLocaleString();
            SOHPortionObj.innerHTML = defaultBV[2].OH.toLocaleString();

            MNonProcObj.value = defaultBV[3].NonProcAmt;
            MProcObj.value = defaultBV[3].ProcAmt;
            MTotalBudgetObj.innerHTML = defaultBV[3].Total.toLocaleString();
            MOHPortionObj.innerHTML = defaultBV[3].OH.toLocaleString();

             var TTNonProc = 0;
             Object.keys(defaultBV).forEach(key => {
                 TTNonProc += parseFloat(defaultBV[key].NonProcAmt);
                 });

             console.log(TTNonProc)

             var TTProc = 0;
             Object.keys(defaultBV).forEach(key => {
                    TTProc += parseFloat(defaultBV[key].Total);
                });

            var TTTotal = 0;
            Object.keys(defaultBV).forEach(key => {
                 TTTotal += parseFloat(defaultBV[key].Total);
                });

            var TTOH =  0;
            Object.keys(defaultBV).forEach(key => {
                 TTOH += parseFloat(defaultBV[key].OH);
                 });

            TNonProcObj.innerHTML = TTNonProc.toLocaleString() ;
            TProcObj.innerHTML =   TTProc.toLocaleString();
            TTotalBudgetObj.innerHTML = TTTotal.toLocaleString();
            TOHPortionObj.innerHTML = TTOH.toLocaleString();
            
            // asign values to hidden inputs in the form for upload int he system

            MaxBVVersionObj  = document.getElementById('input21');
            MaxIndVersionObj = document.getElementById('input22');
            MaxBVVersionObj.value = maxBVVersion[0].maxBVVersion + 1;
            MaxIndVersionObj.value = maxIndVersion[0].maxIndVersion + 1;


            input1 = document.getElementById('input1');
            input2= document.getElementById('input2');
            input3= document.getElementById('input3');
            input4 = document.getElementById('input4');
            input5 = document.getElementById('input5');
            input6 = document.getElementById('input6');
            input7 = document.getElementById('input7');
            input8 = document.getElementById('input8');
            input9 = document.getElementById('input9');
            input10 = document.getElementById('input10');

       
            input11 = document.getElementById('input11');
            input12 = document.getElementById('input12');
            input13 = document.getElementById('input13');
            input14 = document.getElementById('input14');
            input15 = document.getElementById('input15');
            input16 = document.getElementById('input16');
            input17 = document.getElementById('input17');
            input18 = document.getElementById('input18');
            input19 = document.getElementById('input19');
            input20 = document.getElementById('input20');

            input1.value = defaultBV[0].Total;
            input2.value = defaultBV[0].OH;
            input3.value = defaultBV[1].Total;
            input4.value = defaultBV[1].OH;
            input5.value = defaultBV[4].Total;
            input6.value = defaultBV[4].OH;
            input7.value = defaultBV[2].Total;
            input8.value = defaultBV[2].OH;
            input9.value = defaultBV[3].Total;
            input10.value = defaultBV[3].OH;
            input11.value = indRowData[0].BVAmt;
            input12.value = indRowData[1].BVAmt;
            input13.value = indRowData[2].BVAmt;
            input14.value = indRowData[3].BVAmt;
            input15.value = indRowData[4].BVAmt;
            input16.value = indRowData[0].Calculated_Rate;
            input17.value = indRowData[1].Calculated_Rate;
            input18.value = indRowData[2].Calculated_Rate;
            input19.value = indRowData[3].Calculated_Rate;
            input20.value = indRowData[4].Calculated_Rate;


            
            function resetInputs() {


                BVGAObj.innerHTML = indRowData[0].BVAmt.toLocaleString();
                BVSPIObj.innerHTML = indRowData[1].BVAmt.toLocaleString();
                BVICPObj.innerHTML = indRowData[2].BVAmt.toLocaleString();
                BVLDRDObj.innerHTML = indRowData[3].BVAmt.toLocaleString();
                BVProcObj.innerHTML = indRowData[4].BVAmt.toLocaleString();

                newGAObj.innerHTML = indRowData[0].Calculated_Rate.toLocaleString();
                newSPIObj.innerHTML = indRowData[0].Calculated_Rate.toLocaleString();
                newICPObj.innerHTML = indRowData[0].Calculated_Rate.toLocaleString();
                newLDRDObj.innerHTML = indRowData[0].Calculated_Rate.toLocaleString();
                newProcObj.innerHTML = indRowData[0].Calculated_Rate.toLocaleString();

                FNonProcObj.value = defaultBV[0].NonProcAmt;
                FProcObj.value = defaultBV[0].ProcAmt;
                FTotalBudgetObj.innerHTML = defaultBV[0].Total.toLocaleString();
                FOHPortionObj.innerHTML = defaultBV[0].OH.toLocaleString();

                BNonProcObj.value = defaultBV[1].NonProcAmt;
                BProcObj.value = defaultBV[1].ProcAmt;
                BTotalBudgetObj.innerHTML = defaultBV[1].Total.toLocaleString();
                BOHPortionObj.innerHTML = defaultBV[1].OH.toLocaleString();
            
                ONonProcObj.value = defaultBV[4].NonProcAmt;
                OProcObj.value = defaultBV[4].ProcAmt;
                OTotalBudgetObj.innerHTML = defaultBV[4].Total.toLocaleString();
                OOHPortionObj.innerHTML = defaultBV[4].OH.toLocaleString();

                SNonProcObj.value = defaultBV[2].NonProcAmt;
                SProcObj.value = defaultBV[2].ProcAmt;
                STotalBudgetObj.innerHTML = defaultBV[2].Total.toLocaleString();
                SOHPortionObj.innerHTML = defaultBV[2].OH.toLocaleString();

                MNonProcObj.value = defaultBV[3].NonProcAmt;
                MProcObj.value = defaultBV[3].ProcAmt;
                MTotalBudgetObj.innerHTML = defaultBV[3].Total.toLocaleString();
                MOHPortionObj.innerHTML = defaultBV[3].OH.toLocaleString();

                var TTNonProc = 0;
                Object.keys(defaultBV).forEach(key => {
                 TTNonProc += parseFloat(defaultBV[key].NonProcAmt);
                 });

    

                var TTProc = 0;
                Object.keys(defaultBV).forEach(key => {
                    TTProc += parseFloat(defaultBV[key].Total);
                });

                var TTTotal = 0;
                Object.keys(defaultBV).forEach(key => {
                 TTTotal += parseFloat(defaultBV[key].Total);
                });

                var TTOH =  0;
                Object.keys(defaultBV).forEach(key => {
                 TTOH += parseFloat(defaultBV[key].OH);
                 });

                TNonProcObj.innerHTML = TTNonProc.toLocaleString() ;
                TProcObj.innerHTML =   TTProc.toLocaleString();
                TTotalBudgetObj.innerHTML = TTTotal.toLocaleString();
                TOHPortionObj.innerHTML = TTOH.toLocaleString();

                input1.value = defaultBV[0].Total;
                input2.value = defaultBV[0].OH;
                input3.value = defaultBV[1].Total;
                input4.value = defaultBV[1].OH;
                input5.value = defaultBV[4].Total;
                input6.value = defaultBV[4].OH;
                input7.value = defaultBV[2].Total;
                input8.value = defaultBV[2].OH;
                input9.value = defaultBV[3].Total;
                input10.value = defaultBV[3].OH;
                input11.value = indRowData[0].BVAmt;
                input12.value = indRowData[1].BVAmt;
                input13.value = indRowData[2].BVAmt;
                input14.value = indRowData[3].BVAmt;
                input15.value = indRowData[4].BVAmt;
                input16.value = indRowData[0].Calculated_Rate;
                input17.value = indRowData[1].Calculated_Rate;
                input18.value = indRowData[2].Calculated_Rate;
                input19.value = indRowData[3].Calculated_Rate;
                input20.value = indRowData[4].Calculated_Rate;

            }


            function calcRate() {

                 //  Calculate and assing values

                var GARate = .2;
                var SPIRate = .1;
                var ICPRate  = .02;
                var LDRDRate = .05;
                var ProcRate = .07;

                var FRate = (GARate + SPIRate + ICPRate + LDRDRate)
                var BRate = (GARate + SPIRate  + LDRDRate)
                var SRate = (GARate + SPIRate + ICPRate + LDRDRate)
                var ORate = (LDRDRate)
                var MRate = (GARate + LDRDRate)

                //******************************************************

                //  Get New input values
                var FnonProc = new Number(FNonProcObj.value);
                var FProc = new Number(FProcObj.value);
                FTotalBudgetObj.innerHTML = '';
                FOHPortionObj.innerHTML = '';

                //  Verify Input

                if(isNaN(FnonProc) || isNaN(FProc)) {
                    alert('Invalid input in Facility Operations');
                    return;
                }


                // CALCULATE

                var F_Base =  FnonProc/(1 + FRate);
                var F_OH = FnonProc - F_Base;
                var F_GA = F_Base * GARate;
                var F_SPI = F_Base * SPIRate;
                var F_ICP= F_Base * ICPRate;
                var F_LDRD= F_Base * LDRDRate;

                var FP_Base =  FProc/(1 + ProcRate);
                var FP_OH = FProc - FP_Base;

                //aSSIGN VALUES

                FTotalBudgetObj.innerHTML = (FnonProc + FProc).toLocaleString();
                FOHPortionObj.innerHTML = F_OH.toLocaleString();

                input1.value = (FnonProc + FProc);
                input2.value = F_OH

                 //******************************************************


                var BnonProc = new Number(BNonProcObj.value);
                var BProc = new Number(BProcObj.value);
                BTotalBudgetObj.innerHTML = '';
                BOHPortionObj.innerHTML = '';
             
            

                if(isNaN(BnonProc) || isNaN(BProc)) {
                    alert('Invalid input in BES / HEP');
                    return;
                }

                // CALCLUATE

                var B_Base =  BnonProc/(1 + BRate);
                var B_OH = BnonProc - B_Base;
                var B_GA = B_Base * GARate;
                var B_SPI = B_Base * SPIRate;
                var B_ICP= 0;
                var B_LDRD= B_Base * LDRDRate;

                var BP_Base =  BProc/(1 + ProcRate);
                var BP_OH = BProc - BP_Base;


                 //aSSIGN VALUES

                BTotalBudgetObj.innerHTML = (BnonProc + BProc).toLocaleString();
                BOHPortionObj.innerHTML = B_OH.toLocaleString();

                input3.value = (BnonProc + BProc);
                input4.value = B_OH;
              


                //******************************************************

                var OnonProc = new Number(ONonProcObj.value);
                var OProc = new Number(OProcObj.value);
                OTotalBudgetObj.innerHTML = '';
                OOHPortionObj.innerHTML = '';

                if(isNaN(OnonProc) || isNaN(OProc)) {
                    alert('Invalid input in Other SC Markets');
                    return;
                }

                // OTHER

                var O_Base =  OnonProc/(1 + ORate);
                var O_OH = OnonProc - O_Base;
                var O_GA = 0;
                var O_SPI = 0;
                var O_ICP= 0;
                var O_LDRD= O_Base * LDRDRate;

                var OP_Base =  OProc/(1 + ProcRate);
                var OP_OH = OProc - OP_Base;

                //aSSIGN VALUES

                OTotalBudgetObj.innerHTML = (OnonProc + OProc).toLocaleString();
                OOHPortionObj.innerHTML = O_OH.toLocaleString();

                input5.value = (OnonProc + OProc);
                input6.value = O_OH;
            


                //******************************************************

                var MnonProc = new Number(MNonProcObj.value);
                var MProc = new Number(MProcObj.value);
                MTotalBudgetObj.innerHTML = '';
                MOHPortionObj.innerHTML = '';

                if(isNaN(MnonProc) || isNaN(MProc)) {
                    alert('Invalid input in Major Projects');
                    return;
                }

                // MAJOR

                var M_Base =  MnonProc/(1 + MRate);
                var M_OH = MnonProc - M_Base;
                var M_GA = M_Base * GARate;
                var M_SPI = 0;
                var M_ICP= 0;
                var M_LDRD= M_Base * LDRDRate;

                var MP_Base =  MProc/(1 + ProcRate);
                var MP_OH = MProc - MP_Base;

                //aSSIGN VALUES

                MTotalBudgetObj.innerHTML = (MnonProc + MProc).toLocaleString();
                MOHPortionObj.innerHTML = M_OH.toLocaleString();
                input9.value = (MnonProc + MProc);
                input10.value =  M_OH;

            

                //******************************************************

                var SnonProc = new Number(SNonProcObj.value);
                var SProc = new Number(SProcObj.value);
                STotalBudgetObj.innerHTML = '';
                SOHPortionObj.innerHTML = '';

                console.log(SnonProc)
                console.log(SProc)

                

                if(isNaN(SnonProc) || isNaN(SProc)) {
                    alert('Invalid input in SPP');
                    return;
                }


                // CALCULATE

                var S_Base =  SnonProc/(1 + SRate);
                var S_OH = SnonProc - S_Base;
                var S_GA = S_Base * GARate;
                var S_SPI = S_Base * SPIRate;
                var S_ICP= S_Base * ICPRate;
                var S_LDRD= S_Base * LDRDRate;

                var SP_Base =  SProc/(1 + ProcRate);
                var SP_OH = SProc - SP_Base;

                //aSSIGN VALUES

                STotalBudgetObj.innerHTML = (SnonProc + SProc).toLocaleString();
                SOHPortionObj.innerHTML = S_OH.toLocaleString();

                input7.value = (SnonProc + SProc);
                input8.value = S_OH;
            

                //******************************************************
                



                TNonProcObj.innerHTML = '';
                TProcObj.innerHTML = '';
                TTotalBudgetObj.innerHTML = '';
                TOHPortionObj.innerHTML = '';

                TNonProcObj.innerHTML = (FnonProc  + BnonProc + MnonProc + SnonProc + OnonProc).toLocaleString();
                TProcObj.innerHTML = (FProc  + BProc + MProc + SProc + OProc).toLocaleString();
                TTotalBudgetObj.innerHTML = (FnonProc  + BnonProc + 0 + 0 + OnonProc + FProc  + BProc + 0 + 0 + OProc).toLocaleString();
                TOHPortionObj.innerHTML = (F_OH + B_OH + 0 + 0+ O_OH).toLocaleString();

                BVGAObj.innerHTML = (F_Base + B_Base + S_Base + M_Base + O_Base).toLocaleString();
                BVSPIObj.innerHTML = (F_Base + B_Base + S_Base ).toLocaleString();
                BVICPObj.innerHTML = (F_Base +  S_Base ).toLocaleString();
                BVLDRDObj.innerHTML = (F_Base + B_Base + S_Base + M_Base + O_Base).toLocaleString();
                BVProcObj.innerHTML = (FP_Base + BP_Base + SP_Base + MP_Base + OP_Base).toLocaleString();

                console.log((F_Base + B_Base + S_Base + M_Base + O_Base))

                input11.value = (F_Base + B_Base + S_Base + M_Base + O_Base);
                input13.value = (F_Base + B_Base + S_Base );
                input13.value = (F_Base +  S_Base );
                input14.value = (F_Base + B_Base + S_Base + M_Base + O_Base);
                input15.value = (FP_Base + BP_Base + SP_Base + MP_Base + OP_Base)
            



                var PoolGAAmt = indRowData[0].PoolAmt;
                var PoolSPIAmt = indRowData[1].PoolAmt;;
                var PoolICPAmt = indRowData[2].PoolAmt;;
                var PoolLDRDAmt = indRowData[3].PoolAmt;;
                var PoolProcAmt = indRowData[4].PoolAmt;;

                newGAObj.innerHTML =  (PoolGAAmt / (F_Base + B_Base + S_Base + M_Base + O_Base)).toLocaleString();
                newSPIObj.innerHTML = (PoolSPIAmt / (F_Base + B_Base + S_Base )).toLocaleString();
                newICPObj.innerHTML = (PoolICPAmt / (F_Base +  S_Base )).toLocaleString();
                newLDRDObj.innerHTML =(PoolLDRDAmt /  (F_Base + B_Base + S_Base + M_Base + O_Base)).toLocaleString();
                newProcObj.innerHTML =(PoolProcAmt / (FP_Base + BP_Base + SP_Base + MP_Base + OP_Base)).toLocaleString();

                input16.value = (PoolGAAmt / (F_Base + B_Base + S_Base + M_Base + O_Base));
                input17.value = (PoolSPIAmt / (F_Base + B_Base + S_Base ));
                input18.value = (PoolICPAmt / (F_Base +  S_Base ));
                input19.value = (PoolLDRDAmt /  (F_Base + B_Base + S_Base + M_Base + O_Base));
                input20.value = (PoolProcAmt / (FP_Base + BP_Base + SP_Base + MP_Base + OP_Base));


                //******************************************************

                

              

            }

            