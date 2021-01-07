export const useDayspermonth = (month, year) => {
      let days = 0
      if(month === '01' || month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12' ) {
          return days = 31
      } if(month === '04' || month === '06' || month === '09' || month === '11') {
          return days = 30
      } if(month === '02') {
          if((year - 2016) % 4 === 0 ) {
              return days = 29
          } else {
              return days = 28
          }
      }
      return days
  }