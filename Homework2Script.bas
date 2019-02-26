Attribute VB_Name = "Module1"
Sub homeworkVBA()

'---------------------------------------------
' Do for each worksheet
' find the number of rows
' find the number of columns
' Add Ticker and Total Stock Volumn columns
' Add distinct Ticker
' Add sum of each stock volume
'---------------------------------------------

Dim ws As Worksheet
  For Each ws In ActiveWorkbook.Sheets
  
  'activate worksheet
  ws.Activate
    
 ' get the last row and column
  Dim lastRow, lastColumn, nextRow As Integer
  ws.Range("A1").Select
  lastRow = ws.Cells(1, 1).End(xlDown).Row
  ws.Range("A1").Select
  lastColumn = ws.Cells(1, 1).End(xlToRight).Column
  nextRow = 2
  
  ' Add columns headings
  ws.Cells(1, lastColumn + 2).Value = "Ticker"
  ws.Cells(1, lastColumn + 3).Value = "Stock Volume"
  
  'Loop through and add distinct value in lastColumn +2, add total to lastColumn +3
  Dim stockVolume As Double
  
    For i = 2 To lastRow
    
    ' Searches for when the value of the next cell is different than that of the current cell
    If Cells(i + 1, 1).Value = Cells(i, 1).Value Then
    stockVolume = stockVolume + Cells(i, lastColumn).Value
    
    ElseIf Cells(i + 1, 1).Value <> Cells(i, 1).Value Then
      stockVolume = stockVolume + Cells(i, lastColumn).Value
      ' assign values
      Cells(nextRow, lastColumn + 2).Value = Cells(i, 1).Value
      Cells(nextRow, lastColumn + 3).Value = stockVolume
      nextRow = nextRow + 1
      stockVolume = 0
    End If

  Next i
     
  Next ws

End Sub
