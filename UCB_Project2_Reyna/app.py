

import sqlite3
import sqlite3 as sql

conn = sqlite3.connect('database.db')

conn.close()

from flask import Flask, render_template, request
import sqlite3 as sql

print('this again')
#################################################
# Generates a python dictionary from sqlite3
###############################################
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


#################################################
# Flask
###############################################
app = Flask(__name__)




@app.route("/")
def main():
	return render_template ('about.html')



@app.route("/userguide")
def viewBV():
# connect to sqlite3
	con = sql.connect("database.db")
	con.row_factory = sql.Row
	print('print this')
	

# pull indirect table	
	cur = con.cursor()
	cur.execute("SELECT Version, Indirect_Pool,  PoolAmt , BVAmt, Applied_Rate from Ind_Tbl1 order by Version Desc")
	rows = cur.fetchall(); 

	print(rows)

	cur2 = con.cursor()
	cur2.execute("SELECT DISTINCT Version from Ind_Tbl1")
	ind_version = cur2.fetchall();

# pull rate table
	ratequery_string = "SELECT indirect_Pool, Applied_Rate FROM Ind_tbl1 where Version = 1 "
	cur3 = con.cursor()
	cur3.execute(ratequery_string)
	oh_rate = cur3.fetchall();

#pull business volume
	bvquery_string = "SELECT Year, Version, Funding_Category,NonProcAmt, ProcAmt, Total, OH FROM BV_TBL1 order by Year Desc, Version Desc"
	cur4 = con.cursor()
	cur4.execute(bvquery_string)
	bv_data = cur4.fetchall();

# push information to htm
	return render_template("userguide.html", rows = rows,ind_version = ind_version, oh_rate = oh_rate, bv_data = bv_data)


	con.close()
@app.route("/visualization")
def list():
	# connect to sqlite3
	con1 = sql.connect("database.db")
	con1.row_factory = dict_factory
	

# pull first graph	
	cur5 = con1.cursor()
	cur5.execute("SELECT Funding_Category , sum(Total) Total FROM BV_TBL1 where Year = (select max(Year) from BV_TBL1) and version = (select max(version) from BV_TBL1 where year = (select max(Year) from BV_TBL1)) GROUP BY Funding_Category")
	firstGraph = cur5.fetchall(); 

# pull another graph	
	cur6= con1.cursor()
	cur6.execute("SELECT Year, Funding_Category,sum(Total) Total FROM BV_TBL1 WHERE VERSION = 4 AND YEAR <>2020 GROUP BY Year, Funding_Category UNION ALL SELECT Year, Funding_Category, sum(Total) Total FROM BV_TBL1 WHERE VERSION = (SELECT MAX(VERSION) FROM BV_TBL1 WHERE YEAR = 2020) AND YEAR =2020 GROUP BY Year, Funding_Category")
	dataGraph = cur6.fetchall(); 

# pull distinct year
	cur= con1.cursor()
	cur.execute("SELECT distinct Year FROM BV_TBL1 order by Year")
	yearGraph = cur.fetchall(); 


# pull indirect table	
	return render_template ('visualization.html', firstGraph=firstGraph, dataGraph = dataGraph, yearGraph = yearGraph)

	con1.close()



@app.route("/calculator")
def getData():

	con2 = sql.connect("database.db")
	con2.row_factory = dict_factory

	cur7 = con2.cursor()
	cur7.execute("SELECT  * FROM Ind_Tbl1  WHERE Version = (SELECT max(version) FROM Ind_tbl1)")
	indRows = cur7.fetchall(); 

	cur8 = con2.cursor()
	cur8.execute("SELECT  * FROM BV_Tbl1  WHERE Year = 2020 AND Version = (SELECT max(version) FROM BV_Tbl1 where  Year = 2020)")
	defaultBV = cur8.fetchall(); 

	cur = con2.cursor()
	cur.execute("SELECT MAX(Version) maxBVVersion from BV_Tbl1 where Year = 2020")
	maxBVVersion = cur.fetchall(); 
	# maxBVVersion = maxBVVersion[0]

	cur1 = con2.cursor()
	cur1.execute("SELECT MAX(Version) maxIndVersion from Ind_Tbl1")
	maxIndVersion = cur1.fetchall(); 
	# maxIndVersion = maxIndVersion[0]

	
	return render_template ('calculator.html', indRows=indRows, defaultBV  = defaultBV, maxBVVersion = maxBVVersion, maxIndVersion = maxIndVersion )

	con2.close()


@app.route("/postCalc",  methods =['POST'] )
def postData():
 

	if request.method == 'POST':

		result = request.form
		maxBVVersionName = request.form['maxBVVersionName']
		maxIndVersionName = request.form['maxIndVersionName']

		FNonProc = request.form['FNonProc']
		FProc = request.form['FProc']
		FTotalBudget = request.form['FTotalBudget']
		FOHPortion = request.form['FOHPortion']

		BNonProc = request.form['BNonProc']
		BProc = request.form['BProc']
		BTotalBudget = request.form['BTotalBudget']
		BOHPortion = request.form['BOHPortion']

		ONonProc = request.form['ONonProc']
		OProc = request.form['OProc']
		OTotalBudget = request.form['OTotalBudget']
		OOHPortion = request.form['OOHPortion']

		MNonProc = request.form['MNonProc']
		MProc = request.form['MProc']
		MTotalBudget = request.form['MTotalBudget']
		MOHPortion = request.form['MOHPortion']

		SNonProc = request.form['SNonProc']
		SProc = request.form['SProc']
		STotalBudget = request.form['STotalBudget']
		SOHPortion = request.form['SOHPortion']

		BVGA = request.form['BVGA']
		BVSPI = request.form['BVSPI']
		BVICP = request.form['BVICP']
		BVLDRD = request.form['BVLDRD']
		BVProc = request.form['BVProc']

		newGA = request.form['newGA']
		newSPI = request.form['newSPI']
		newICP = request.form['newICP']
		newLDRD = request.form['newLDRD']
		newProc = request.form['newProc']



		with sql.connect("database.db") as con:
				cur = con.cursor()

				cur.execute("INSERT INTO BV_Tbl1 (Year, Version, Funding_Category, NonProcAmt, ProcAmt, Total, OH) VALUES (?,?,?,?,?,?,?)",(2020, maxBVVersionName,'Facility Operations', FNonProc, FProc, FTotalBudget, FOHPortion) )
			
				cur.execute("INSERT INTO BV_Tbl1 (Year, Version, Funding_Category, NonProcAmt, ProcAmt, Total, OH) VALUES (?,?,?,?,?,?,?)",(2020, maxBVVersionName,'BES /  HEP', BNonProc, BProc, BTotalBudget, BOHPortion) )
				
				cur.execute("INSERT INTO BV_Tbl1 (Year, Version, Funding_Category, NonProcAmt, ProcAmt, Total, OH) VALUES (?,?,?,?,?,?,?)",(2020, maxBVVersionName,'Other SC Markets', ONonProc, OProc, OTotalBudget, OOHPortion) )
			
				cur.execute("INSERT INTO BV_Tbl1 (Year, Version, Funding_Category, NonProcAmt, ProcAmt, Total, OH) VALUES (?,?,?,?,?,?,?)",(2020, maxBVVersionName,'SPP & New Markets', SNonProc, SProc, STotalBudget, SOHPortion) )

				cur.execute("INSERT INTO BV_Tbl1 (Year, Version, Funding_Category, NonProcAmt, ProcAmt, Total, OH) VALUES (?,?,?,?,?,?,?)",(2020, maxBVVersionName,'Major Projects', MNonProc, MProc, MTotalBudget, MOHPortion) )
				
				cur.execute("INSERT INTO Ind_Tbl1 ( Version, Indirect_Pool, PoolAmt, BVAmt, Applied_Rate, Calculated_Rate) VALUES (?,?,?,?,?,?)",(maxIndVersionName,'GA', 116583, BVGA, .2, newGA) )

				cur.execute("INSERT INTO Ind_Tbl1 ( Version, Indirect_Pool, PoolAmt, BVAmt, Applied_Rate, Calculated_Rate) VALUES (?,?,?,?,?,?)",(maxIndVersionName,'SPI',29428, BVSPI, .1, newSPI) )

				cur.execute("INSERT INTO Ind_Tbl1 ( Version, Indirect_Pool, PoolAmt, BVAmt, Applied_Rate, Calculated_Rate) VALUES (?,?,?,?,?,?)",(maxIndVersionName,'ICP',4404, BVICP, .02, newICP) )

				cur.execute("INSERT INTO Ind_Tbl1 ( Version, Indirect_Pool, PoolAmt, BVAmt, Applied_Rate, Calculated_Rate) VALUES (?,?,?,?,?,?)",(maxIndVersionName,'LDRD',30819, BVLDRD, .05, newLDRD) )

				cur.execute("INSERT INTO Ind_Tbl1 ( Version, Indirect_Pool, PoolAmt, BVAmt, Applied_Rate, Calculated_Rate) VALUES (?,?,?,?,?,?)",(maxIndVersionName,'Proc',22229, BVProc, .07, newProc) )
			
				
				con.commit() 
				return render_template("result.html",result = result)
				con.close()



if __name__ == "__main__":
	app.run()
