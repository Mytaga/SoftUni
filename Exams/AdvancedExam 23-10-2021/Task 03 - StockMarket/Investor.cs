using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StockMarket
{
    public class Investor
    {
        private List<Stock> portfoliio;

        public Investor(string fullName, string emailAddress, decimal moneyToInvest, string brokerName)
        {
            FullName = fullName;
            EmailAddress = emailAddress;
            MoneyToInvest = moneyToInvest;
            BrokerName = brokerName;
            this.portfoliio = new List<Stock>();
        }

        public string FullName { get; set; }
        public string EmailAddress { get; set; } 
        public decimal MoneyToInvest { get; set; }
        public string BrokerName { get; set; }
        public int Count => this.portfoliio.Count;
        public void BuyStock(Stock stock)
        {
            if (stock.MarketCapitalization > 10000 && this.MoneyToInvest >= stock.PricePerShare)
            {
                this.portfoliio.Add(stock);
                this.MoneyToInvest -= stock.PricePerShare;
            }
        }
        public string SellStock(string companyName, decimal sellPrice)
        {
            if (!this.portfoliio.Any(x => x.CompanyName == companyName))
            {
                return $"{companyName} does not exist.";
            }   
            
            var stockToSell = this.portfoliio.Where(x => x.CompanyName == companyName).FirstOrDefault();

            if (sellPrice < stockToSell.PricePerShare)
            {
                return $"Cannot sell {companyName}.";
            }

            this.MoneyToInvest += sellPrice;
            this.portfoliio.Remove(stockToSell);
            return $"{companyName} was sold.";
        }
        public Stock FindStock(string companyName)
        {
            return this.portfoliio.Where(x => x.CompanyName == companyName).FirstOrDefault();
        }
        public Stock FindBiggestCompany()
        {
            return this.portfoliio.OrderByDescending(x => x.MarketCapitalization).FirstOrDefault();
        }
        public string InvestorInformation()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine($"The investor {this.FullName} with a broker {this.BrokerName} has stocks:");

            foreach (var item in this.portfoliio)
            {
                sb.AppendLine($"{item}");
            }

            return sb.ToString().TrimEnd();
        }
    }
}
